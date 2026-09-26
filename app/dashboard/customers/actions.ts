"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { canManageImages } from "@/lib/images";
import { UserRole, UserStatus, Gender } from "@prisma/client";
import { redirect } from "next/navigation";

export type CustomerFormState = {
  error?: string;
};

export async function createCustomer(
  _previousState: CustomerFormState,
  formData: FormData
): Promise<CustomerFormState> {
  const session = await auth();
  if (!session?.user?.id || !canManageImages(session.user.role)) {
    return { error: "You do not have permission to create customers." };
  }

  const selectedImages = [
    { id: String(formData.get("profileImageId") || ""), folder: "customer/profile" },
    { id: String(formData.get("passportImageId") || ""), folder: "passport" },
    { id: String(formData.get("nidImageId") || ""), folder: "nid" },
  ].filter((image) => image.id);
  if (new Set(selectedImages.map((image) => image.id)).size !== selectedImages.length) {
    return { error: "Please select a different image for each field." };
  }

  const firstName = String(formData.get("firstName") || "").trim();
  const lastName = String(formData.get("lastName") || "").trim();

  const emailValue = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const phoneValue = String(formData.get("phone") || "").trim();

  const email = emailValue || null;
  const phone = phoneValue || null;

  const dateOfBirthValue = String(
    formData.get("dateOfBirth") || ""
  ).trim();

  const genderValue = String(formData.get("gender") || "").trim();

  const nationality =
    String(formData.get("nationality") || "").trim() || null;

  const passportNumber =
    String(formData.get("passportNumber") || "").trim() || null;

  const nidNumber =
    String(formData.get("nidNumber") || "").trim() || null;

  const address =
    String(formData.get("address") || "").trim() || null;

  const city =
    String(formData.get("city") || "").trim() || null;

  const country =
    String(formData.get("country") || "").trim() || "Bangladesh";

  const occupation =
    String(formData.get("occupation") || "").trim() || null;

  const companyName =
    String(formData.get("companyName") || "").trim() || null;

  const emergencyName =
    String(formData.get("emergencyName") || "").trim() || null;

  const emergencyPhone =
    String(formData.get("emergencyPhone") || "").trim() || null;

  const emergencyRelation =
    String(formData.get("emergencyRelation") || "").trim() || null;

  const preferredCurrency =
    String(formData.get("preferredCurrency") || "").trim() || "BDT";

  const preferredLanguage =
    String(formData.get("preferredLanguage") || "").trim() || "en";

  const notes =
    String(formData.get("notes") || "").trim() || null;

  const statusValue =
    String(formData.get("status") || "ACTIVE").trim();

  if (!firstName) {
    return {
      error: "First name is required.",
    };
  }

  if (!phone && !email) {
    return {
      error: "Please provide at least an email address or phone number.",
    };
  }

  if (email) {
    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (existingEmail) {
      return {
        error: "A user with this email address already exists.",
      };
    }
  }

  if (phone) {
    const existingPhone = await prisma.user.findUnique({
      where: {
        phone,
      },
      select: {
        id: true,
      },
    });

    if (existingPhone) {
      return {
        error: "A user with this phone number already exists.",
      };
    }
  }

  let dateOfBirth: Date | null = null;

  if (dateOfBirthValue) {
    const parsedDate = new Date(dateOfBirthValue);

    if (Number.isNaN(parsedDate.getTime())) {
      return {
        error: "Please provide a valid date of birth.",
      };
    }

    dateOfBirth = parsedDate;
  }

  let gender: Gender | null = null;

  if (genderValue) {
    if (!Object.values(Gender).includes(genderValue as Gender)) {
      return {
        error: "Invalid gender selected.",
      };
    }

    gender = genderValue as Gender;
  }

  let status: UserStatus = UserStatus.ACTIVE;

  if (Object.values(UserStatus).includes(statusValue as UserStatus)) {
    status = statusValue as UserStatus;
  }

  let customerId: string;
  try {
    const customer = await prisma.$transaction(async (tx) => {
      if (selectedImages.length) {
        const images = await tx.image.findMany({
          where: { id: { in: selectedImages.map((image) => image.id) }, uploadedById: session.user.id, entityType: null, entityId: null },
          select: { id: true, folder: true },
        });
        if (images.length !== selectedImages.length || selectedImages.some((selected) => !images.some((image) => image.id === selected.id && image.folder === selected.folder))) {
          throw new Error("Selected images are missing or unavailable.");
        }
      }
      const user = await tx.user.create({
        data: {
          firstName,
          lastName: lastName || null,
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
        },
      });

      await tx.customerProfile.create({
        data: {
          userId: user.id,
          occupation,
          companyName,
          emergencyName,
          emergencyPhone,
          emergencyRelation,
          preferredCurrency,
          preferredLanguage,
          notes,
        },
      });

      for (const image of selectedImages) {
        const result = await tx.image.updateMany({
          where: { id: image.id, uploadedById: session.user.id, entityType: null, entityId: null },
          data: { entityType: "CUSTOMER", entityId: user.id },
        });
        if (result.count !== 1) throw new Error("Selected image was already used.");
      }

      return user;
    });

    customerId = customer.id;
  } catch (error) {
    console.error("CREATE_CUSTOMER_ERROR:", error);

    return {
      error:
        "Unable to create customer right now. Please check the information and try again.",
    };
  }
  redirect(`/dashboard/customers?created=${customerId}`);
}
