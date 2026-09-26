import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  Gender,
  UserRole,
  UserStatus,
} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type CreateCustomerBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  passportNumber?: string;
  nidNumber?: string;
  address?: string;
  city?: string;
  country?: string;

  occupation?: string;
  companyName?: string;

  emergencyName?: string;
  emergencyPhone?: string;
  emergencyRelation?: string;

  preferredCurrency?: string;
  preferredLanguage?: string;

  notes?: string;

  status?: string;
};

export async function POST(
  request: NextRequest
) {
  try {
    /*
    |--------------------------------------------------------------------------
    | Authentication
    |--------------------------------------------------------------------------
    */

    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
        },
        {
          status: 401,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Authorization
    |--------------------------------------------------------------------------
    */

    const userRole = session.user.role;

    if (!userRole || userRole === UserRole.CUSTOMER) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You do not have permission to create customers.",
        },
        {
          status: 403,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Parse request body
    |--------------------------------------------------------------------------
    */

    let body: CreateCustomerBody;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON request body.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Normalize values
    |--------------------------------------------------------------------------
    */

    const firstName = String(
      body.firstName || ""
    ).trim();

    const lastName =
      String(body.lastName || "").trim() || null;

    const emailValue = String(
      body.email || ""
    )
      .trim()
      .toLowerCase();

    const email = emailValue || null;

    const phoneValue = String(
      body.phone || ""
    ).trim();

    const phone = phoneValue || null;

    /*
    |--------------------------------------------------------------------------
    | Required validation
    |--------------------------------------------------------------------------
    */

    if (!firstName) {
      return NextResponse.json(
        {
          success: false,
          message: "First name is required.",
          field: "firstName",
        },
        {
          status: 422,
        }
      );
    }

    if (!email && !phone) {
      return NextResponse.json(
        {
          success: false,
          message:
            "At least an email address or phone number is required.",
        },
        {
          status: 422,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Email validation
    |--------------------------------------------------------------------------
    */

    if (email) {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Please provide a valid email address.",
            field: "email",
          },
          {
            status: 422,
          }
        );
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Date of birth
    |--------------------------------------------------------------------------
    */

    let dateOfBirth: Date | null = null;

    if (body.dateOfBirth) {
      const parsedDate = new Date(
        body.dateOfBirth
      );

      if (Number.isNaN(parsedDate.getTime())) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Please provide a valid date of birth.",
            field: "dateOfBirth",
          },
          {
            status: 422,
          }
        );
      }

      dateOfBirth = parsedDate;
    }

    /*
    |--------------------------------------------------------------------------
    | Gender
    |--------------------------------------------------------------------------
    */

    let gender: Gender | null = null;

    if (body.gender) {
      if (
        !Object.values(Gender).includes(
          body.gender as Gender
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid gender.",
            field: "gender",
          },
          {
            status: 422,
          }
        );
      }

      gender = body.gender as Gender;
    }

    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    let status: UserStatus = UserStatus.ACTIVE;

    if (body.status) {
      if (
        !Object.values(UserStatus).includes(
          body.status as UserStatus
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid customer status.",
            field: "status",
          },
          {
            status: 422,
          }
        );
      }

      status = body.status as UserStatus;
    }

    /*
    |--------------------------------------------------------------------------
    | Normalize profile fields
    |--------------------------------------------------------------------------
    */

    const nationality =
      String(body.nationality || "").trim() || null;

    const passportNumber =
      String(body.passportNumber || "").trim() ||
      null;

    const nidNumber =
      String(body.nidNumber || "").trim() || null;

    const address =
      String(body.address || "").trim() || null;

    const city =
      String(body.city || "").trim() || null;

    const country =
      String(body.country || "").trim() ||
      "Bangladesh";

    const occupation =
      String(body.occupation || "").trim() || null;

    const companyName =
      String(body.companyName || "").trim() || null;

    const emergencyName =
      String(body.emergencyName || "").trim() || null;

    const emergencyPhone =
      String(body.emergencyPhone || "").trim() ||
      null;

    const emergencyRelation =
      String(body.emergencyRelation || "").trim() ||
      null;

    const preferredCurrency =
      String(
        body.preferredCurrency || "BDT"
      ).trim();

    const preferredLanguage =
      String(
        body.preferredLanguage || "en"
      ).trim();

    const notes =
      String(body.notes || "").trim() || null;

    /*
    |--------------------------------------------------------------------------
    | Duplicate email
    |--------------------------------------------------------------------------
    */

    if (email) {
      const existingEmail =
        await prisma.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            role: true,
          },
        });

      if (existingEmail) {
        return NextResponse.json(
          {
            success: false,
            message:
              "A user with this email already exists.",
            field: "email",
            existingUserId: existingEmail.id,
          },
          {
            status: 409,
          }
        );
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Duplicate phone
    |--------------------------------------------------------------------------
    */

    if (phone) {
      const existingPhone =
        await prisma.user.findUnique({
          where: {
            phone,
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            role: true,
          },
        });

      if (existingPhone) {
        return NextResponse.json(
          {
            success: false,
            message:
              "A user with this phone number already exists.",
            field: "phone",
            existingUserId: existingPhone.id,
          },
          {
            status: 409,
          }
        );
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Create User + CustomerProfile
    |--------------------------------------------------------------------------
    */

    const customer = await prisma.$transaction(
      async (tx) => {
        const user = await tx.user.create({
          data: {
            firstName,
            lastName,

            email,
            phone,

            dateOfBirth,
            gender,

            nationality,
            passportNumber,
            nidNumber,

            address,
            city,
            country,

            role: UserRole.CUSTOMER,
            status,

            customerProfile: {
              create: {
                occupation,
                companyName,

                emergencyName,
                emergencyPhone,
                emergencyRelation,

                preferredCurrency,
                preferredLanguage,

                notes,
              },
            },
          },

          include: {
            customerProfile: true,
          },
        });

        return user;
      }
    );

    /*
    |--------------------------------------------------------------------------
    | Success
    |--------------------------------------------------------------------------
    */

    return NextResponse.json(
      {
        success: true,
        message: "Customer created successfully.",
        data: {
          id: customer.id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          role: customer.role,
          status: customer.status,
          customerProfile:
            customer.customerProfile,
          createdAt: customer.createdAt,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE_CUSTOMER_API_ERROR:",
      error
    );

    /*
    |--------------------------------------------------------------------------
    | Prisma duplicate race-condition protection
    |--------------------------------------------------------------------------
    */

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A customer with the provided unique information already exists.",
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while creating the customer.",
      },
      {
        status: 500,
      }
    );
  }
}
