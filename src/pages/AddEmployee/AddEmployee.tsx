import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import useToast from "@/hooks/useTostNotification";
import { Label } from "@/components/ui/label";
import useSendEmail from "@/hooks/useSendEmail";
import type { FormValues } from "@/util/types";

const AddEmployee = () => {
  const { toastSuccess } = useToast();
  const { sendemail } = useSendEmail();
  const Navigate = useNavigate();

  const [employees, setEmployees] = useState<FormValues[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("employees") || "[]");
    setEmployees(stored);
  }, []);

  const formSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        email: z.string().email("Invalid email"),
        phone: z
          .string()
          .optional()
          .refine((val) => !val || /^\d{10,15}$/.test(val), {
            message: "Phone must be 10–15 digits",
          }),
        role: z.enum(["Developer", "Designer", "Manager"]),
        joiningDate: z.string().refine((date) => new Date(date) <= new Date(), {
          message: "Joining date must be in the past or today",
        }),
      }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const onSubmit = (data: FormValues) => {
    const updatedData = [...employees, data];
    localStorage.setItem("employees", JSON.stringify(updatedData));
    setEmployees(updatedData);
    toastSuccess("Employee Added Successfully");
    sendemail(data);
    reset();
    Navigate("/employee");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mt-6 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 uppercase text-center">
        <span className="bg-[#269fe8] px-3 py-1 text-white rounded-lg shadow">
          Add Employee
        </span>{" "}
        <span className="text-gray-700">Form</span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label className="font-semibold text-gray-700">Full Name</Label>
          <Input
            placeholder="Enter employee name"
            {...register("name")}
            className="mt-1 bg-white border border-gray-300 text-black focus:ring-2 focus:ring-[#269fe8] focus:border-[#269fe8] transition-all"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label className="font-semibold text-gray-700">Email Address</Label>
          <Input
            placeholder="Enter employee email"
            {...register("email")}
            className="mt-1 bg-white border border-gray-300 text-black focus:ring-2 focus:ring-[#269fe8] focus:border-[#269fe8] transition-all"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label className="font-semibold text-gray-700">Phone Number</Label>
          <Input
            type="number"
            placeholder="Optional"
            {...register("phone")}
            className="mt-1 bg-white border border-gray-300 text-black focus:ring-2 focus:ring-[#269fe8] focus:border-[#269fe8] transition-all"
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label className="font-semibold text-gray-700">Role</Label>
          <select
            {...register("role")}
            className="mt-1 w-full bg-white border border-gray-300 text-black rounded-lg p-2 focus:ring-2 focus:ring-[#269fe8] focus:border-[#269fe8] transition-all"
          >
            <option value="">Select Role</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.role && (
            <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        <div>
          <Label className="font-semibold text-gray-700">Joining Date</Label>
          <Input
            type="date"
            {...register("joiningDate")}
            className="mt-1 bg-white border border-gray-300 text-black focus:ring-2 focus:ring-[#269fe8] focus:border-[#269fe8] transition-all"
          />
          {errors.joiningDate && (
            <p className="text-red-600 text-sm mt-1">
              {errors.joiningDate.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="bg-[#269fe8] text-white hover:bg-[#148ed1] w-full py-3 rounded-xl text-lg font-semibold transition-all shadow-md hover:shadow-xl"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddEmployee;
