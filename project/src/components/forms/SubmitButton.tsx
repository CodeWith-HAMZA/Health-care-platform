"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { AiOutlineLoading } from "react-icons/ai";
interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "w-full"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <AiOutlineLoading size={16} className="animate-spin" />
          Proceeding...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
