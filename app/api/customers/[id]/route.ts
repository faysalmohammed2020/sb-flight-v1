import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { removeImage } from "@/lib/image-storage";
import { canAccessPrivateImages, isImageFolder, isPrivateImage } from "@/lib/images";
import {
  Gender,
  UserRole,
  UserStatus,
} from "@prisma/client";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

const allowedRoles: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.ADMIN,
  UserRole.MANAGER,
  UserRole.STAFF,
  UserRole.SALES,
  UserRole.OPERATIONS,
  UserRole.SUPPORT_AGENT,
];

function normalize(value: unknown) {
  if (value === undefined || value === null) {
    return null;
  }

  const stringValue = String(value).trim();

  return stringValue || null;
}

/* =========================================================
   GET CUSTOMER
========================================================= */

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
        },
        { status: 401 }
      );
    }

    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to access customers.",
        },
        { status: 403 }
      );
    }

    const { id } = await params;

    const customer = await prisma.user.findFirst({
      where: {
        id,
        role: UserRole.CUSTOMER,
      },
      select: {
        id: true, firstName: true, lastName: true, email: true, phone: true,
        dateOfBirth: true, gender: true, nationality: true,
        passportNumber: true, nidNumber: true, address: true,
        city: true, country: true, status: true, createdAt: true,
        customerProfile: {
          select: {
            occupation: true, companyName: true, emergencyName: true,
            emergencyPhone: true, emergencyRelation: true,
            preferredCurrency: true, preferredLanguage: true, notes: true,
          },
        },
        _count: { select: { bookings: true, payments: true } },
      },
    });

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer not found.",
        },
        { status: 404 }
      );
    }

    const images = await prisma.image.findMany({
      where: { entityType: "CUSTOMER", entityId: id },
      select: { id: true, folder: true, originalName: true, alt: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
    const documents = canAccessPrivateImages(session.user.role)
      ? await prisma.userDocument.findMany({
          where: { userId: id },
          select: {
            id: true, name: true, type: true, url: true,
            status: true, issueDate: true, expiryDate: true,
          },
          orderBy: { createdAt: "desc" },
        })
      : [];

    return NextResponse.json({
      success: true,
      customer,
      documents,
      images: images.filter((image) =>
        isImageFolder(image.folder) &&
        (!isPrivateImage(image.folder) || canAccessPrivateImages(session.user.role))
      ),
    }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("GET CUSTOMER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load customer.",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   UPDATE CUSTOMER
========================================================= */

export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
        },
        { status: 401 }
      );
    }

    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to update customers.",
        },
        { status: 403 }
      );
    }

    const { id } = await params;

    const body = await request.json();

    const customer = await prisma.user.findFirst({
      where: {
        id,
        role: UserRole.CUSTOMER,
      },
    });

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer not found.",
        },
        { status: 404 }
      );
    }

    const firstName = normalize(body.firstName);

    if (!firstName) {
      return NextResponse.json(
        {
          success: false,
          message: "First name is required.",
        },
        { status: 400 }
      );
    }

    const email = normalize(body.email)?.toLowerCase();
    const phone = normalize(body.phone);

    if (!email && !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Email or phone number is required.",
        },
        { status: 400 }
      );
    }

    if (email) {
      const existingEmail = await prisma.user.findFirst({
        where: {
          email,
          NOT: {
            id,
          },
        },
      });

      if (existingEmail) {
        return NextResponse.json(
          {
            success: false,
            message: "This email is already in use.",
          },
          { status: 409 }
        );
      }
    }

    if (phone) {
      const existingPhone = await prisma.user.findFirst({
        where: {
          phone,
          NOT: {
            id,
          },
        },
      });

      if (existingPhone) {
        return NextResponse.json(
          {
            success: false,
            message: "This phone number is already in use.",
          },
          { status: 409 }
        );
      }
    }

    let gender: Gender | null = null;

    if (body.gender) {
      if (!Object.values(Gender).includes(body.gender)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid gender.",
          },
          { status: 400 }
        );
      }

      gender = body.gender as Gender;
    }

    let status: UserStatus = customer.status;

    if (body.status) {
      if (!Object.values(UserStatus).includes(body.status)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid status.",
          },
          { status: 400 }
        );
      }

      status = body.status as UserStatus;
    }

    let dateOfBirth: Date | null = null;

    if (body.dateOfBirth) {
      const parsedDate = new Date(body.dateOfBirth);

      if (Number.isNaN(parsedDate.getTime())) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid date of birth.",
          },
          { status: 400 }
        );
      }

      dateOfBirth = parsedDate;
    }

    const updatedCustomer = await prisma.$transaction(
      async (tx) => {
        const updatedUser = await tx.user.update({
          where: {
            id,
          },
          data: {
            firstName,
            lastName: normalize(body.lastName),
            email,
            phone,
            image: normalize(body.image),
            dateOfBirth,
            gender,
            nationality: normalize(body.nationality),
            passportNumber: normalize(body.passportNumber),
            nidNumber: normalize(body.nidNumber),
            address: normalize(body.address),
            city: normalize(body.city),
            country:
              normalize(body.country) || "Bangladesh",
            status,
          },
        });

        await tx.customerProfile.upsert({
          where: {
            userId: id,
          },
          create: {
            userId: id,
            occupation: normalize(body.occupation),
            companyName: normalize(body.companyName),
            emergencyName: normalize(body.emergencyName),
            emergencyPhone: normalize(body.emergencyPhone),
            emergencyRelation: normalize(
              body.emergencyRelation
            ),
            preferredCurrency:
              normalize(body.preferredCurrency) || "BDT",
            preferredLanguage:
              normalize(body.preferredLanguage) || "en",
            notes: normalize(body.notes),
          },
          update: {
            occupation: normalize(body.occupation),
            companyName: normalize(body.companyName),
            emergencyName: normalize(body.emergencyName),
            emergencyPhone: normalize(body.emergencyPhone),
            emergencyRelation: normalize(
              body.emergencyRelation
            ),
            preferredCurrency:
              normalize(body.preferredCurrency) || "BDT",
            preferredLanguage:
              normalize(body.preferredLanguage) || "en",
            notes: normalize(body.notes),
          },
        });

        return updatedUser;
      }
    );

    return NextResponse.json({
      success: true,
      message: "Customer updated successfully.",
      customer: updatedCustomer,
    });
  } catch (error: unknown) {
    console.error("UPDATE CUSTOMER ERROR:", error);

    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          message: "Email or phone number already exists.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update customer.",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   DELETE CUSTOMER
========================================================= */

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
        },
        { status: 401 }
      );
    }

    const deleteRoles: UserRole[] = [
      UserRole.SUPER_ADMIN,
      UserRole.ADMIN,
      UserRole.MANAGER,
    ];

    if (!deleteRoles.includes(session.user.role)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You are not authorized to delete customers.",
        },
        { status: 403 }
      );
    }

    const { id } = await params;

    const customer = await prisma.user.findFirst({
      where: {
        id,
        role: UserRole.CUSTOMER,
      },
      include: {
        _count: {
          select: {
            bookings: true,
            payments: true,
          },
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer not found.",
        },
        { status: 404 }
      );
    }

    /*
     * Do not physically delete customers who already
     * have financial or booking records.
     */
    if (
      customer._count.bookings > 0 ||
      customer._count.payments > 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This customer has booking or payment records. Delete is not allowed. Please deactivate the customer instead.",
        },
        { status: 409 }
      );
    }

    const images = await prisma.image.findMany({
      where: { entityType: "CUSTOMER", entityId: id },
      select: { url: true, folder: true },
    });
    await prisma.$transaction(async (tx) => {
      await tx.image.deleteMany({ where: { entityType: "CUSTOMER", entityId: id } });
      await tx.user.delete({ where: { id } });
    });
    for (const image of images) {
      if (!isImageFolder(image.folder)) continue;
      try { await removeImage(image.url, image.folder); }
      catch (error) { console.error("CUSTOMER_IMAGE_CLEANUP_ERROR:", error); }
    }

    return NextResponse.json({
      success: true,
      message: "Customer deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE CUSTOMER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete customer.",
      },
      { status: 500 }
    );
  }
}
