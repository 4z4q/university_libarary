"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/app/constant";
import FileUpload from "./FileUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// T Generic Type used to define the type of the form

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const isSignIn = type === "SIGN_IN";
  const router = useRouter();

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit( data );
    if (result.success) {
      toast.success("Success", {
        description: isSignIn
          ? "Welcome back!"
          : "Account created successfully",
      });
      router.push("/");
    } else {
      toast.error(`Error ${isSignIn ? "Signing in" : "Signing up"}`, {
        description: result.error ?? "An Error occured",
      });
    }

    return result;
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-white font-semibold text-2xl">
        {isSignIn ? "Welcome back to BookWise" : "Create an account"}
      </h1>

      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues)
            .filter((field) => field !== "universityId") // 🔹 استثناء universityId
            .map((field) => (
              <FormField
                key={field.toString()}
                control={form.control}
                name={field as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                    </FormLabel>
                    <FormControl>
                      {field.name === "universityCard" ? (
                        <FileUpload
                          type="image"
                          accept="image/*"
                          placeholder="Upload your ID"
                          folder="ids"
                          variant="dark"
                          onFileChange={field.onChange}
                        />
                      ) : (
                        <Input
                          required
                          {...field}
                          className="form-input"
                          type={
                            FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                          }
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

          <Button type="submit" className="form-btn">
            {isSignIn ? "Sign in" : "Sign up"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? "New to BookWise? " : "Already have an account? "}

        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
