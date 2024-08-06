import { ADMIN_PASSKEY } from "@/appwrite.config";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PasskeyModal() {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!path) return; // Early return if path is not defined (for defence)

    const encryptedKey =
      typeof window !== "undefined"
        ? window.localStorage.getItem("accessKey")
        : null;
    const accessKey = encryptedKey && decryptKey(encryptedKey);

    if (accessKey === ADMIN_PASSKEY) {
      setOpen(false);
      router.push("/admin");
    } else {
      setOpen(true);
    }
  }, [path]);

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (passkey === ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);

      localStorage.setItem("accessKey", encryptedKey);
      router.push('/admin')

      setOpen(false);
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  return (
    <AlertDialog defaultOpen>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle className="flex justify-between items-start">
            {" "}
            Admin Access Verification
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => closeModal()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            Please enter the 6-digit passcode we sent to your phone to confirm
            this action.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center">
          <InputOTP
            value={passkey}
            onChange={(value) => setPasskey(value)}
            maxLength={6}
          >
            <InputOTPGroup className="flex gap-2">
              <InputOTPSlot
                className="border border-neutral-600 size-12 text-lg"
                index={0}
              />
              <InputOTPSlot
                className="border border-neutral-600 size-12 text-lg"
                index={1}
              />
              <InputOTPSlot
                className="border border-neutral-600 size-12 text-lg"
                index={2}
              />
              <InputOTPSlot
                className="border border-neutral-600 size-12 text-lg"
                index={3}
              />
              <InputOTPSlot
                className="border border-neutral-600 size-12 text-lg"
                index={4}
              />
              <InputOTPSlot
                className="border border-neutral-600 size-12 text-lg"
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
        </div>
        {error && (
          <p className="shad-error text-14-regular mt-4 flex justify-center">
            {error}
          </p>
        )}
        <AlertDialogFooter className="justify-center w-full">
          <AlertDialogAction
            className="w-full"
            onClick={(e) => validatePasskey(e)}
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
