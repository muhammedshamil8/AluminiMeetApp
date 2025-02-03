import React, { useState, useRef, useEffect } from "react";
import { createRecord } from "@/utils/airtableService";
import BackButton from "@/components/BackButton";
import SuccesImg from "@/assets/succes.svg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import autoAnimate from "@formkit/auto-animate";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
// Updated schema with phone number validation
const formSchema = z.object({
    Name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters" })
        .max(50, { message: "Name cannot exceed 50 characters" }),
    PhoneNumber: z
        .string()
        .min(10, { message: "Phone number must be at least 10 digits" })
        .max(15, { message: "Phone number cannot exceed 15 digits" })
        .regex(/^\d+$/, { message: "Phone number must contain only numbers" }),
    Batch: z.string().min(1, { message: "Batch is required" }),
    Department: z.string().min(1, { message: "Department is required" }),
});

const department = [
    { value: "B.Sc Microbiology" },
    { value: "B.Sc Biochemistry" },
    { value: "B.Sc Biotechnology" },
    { value: "B.Sc Computer Science" },
    { value: "B.A English" },
    { value: "B.A Economics" },
    { value: "B.A West Asian Studies" },
    { value: "PDC / Pre Degree" },
    { value: "Commerce" },
    { value: "BBA" },
    { value: "B.Voc" },
    { value: "M.Sc Microbiology" },
    { value: "M.A English" },
    { value: "M.A Economics" },
    { value: "M.A History"},
    { value: "M.Com" },
];

function generateYears(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) =>
        (start + i).toString()
    );
}

function Registration() {
    const [loading, setLoading] = useState(false);
    const parent = useRef(null);
    const [open, setOpen] = useState(false);
    const [BatchOpen, setBatchOpen] = useState(false);
    const [departmentOpen, setDepartmentOpen] = useState(false);
    const navigate = useNavigate();

    const handleDialog = () => {
        setOpen(!open);
    };

    const handleBatchOpen = () => {
        setBatchOpen(!BatchOpen);
    };

    const handleDepartmentOpen = () => {
        setDepartmentOpen(!departmentOpen);
    };

    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Name: "",
            PhoneNumber: "",
            Batch: "",
            Department: "",
        },
    });

    // Handle form submission
    const register = async (values) => {
        setLoading(true);

        try {
            const newRecord = await createRecord("Alumni", form.getValues());
            console.log("Record created successfully:", newRecord);
            toast("Event has been created", { type: "success" });
            // Reset form data
            form.reset();
            setOpen(true);
        } catch (err) {
            toast("Event has been created", { type: "error" });
            console.error("Error creating record:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleNaviagtion = (path) => {
        navigate(path);
    };
    const handleJoinWhatsapp = () => {
        const url = "https://whatsapp.com/channel/0029Vb4Bpa1EAKWGjU9LqI2u";
        window.open(url, "_blank");
    };

    return (
        <div className="relative h-full flex-1 flex items-center justify-around flex-col w-full gap-10">
            <div className="flex items-start justify-start w-full px-6 my-20">
                <BackButton label="Registration" />
            </div>
            <div className="bg-white p-6 w-full flex-grow" ref={parent}>
                <Form {...form} ref={parent}>
                    <form
                        onSubmit={form.handleSubmit(register)}
                        className="space-y-4 w-full max-w-[350px] mx-auto"
                        ref={parent}
                    >
                        {/* Name Field */}
                        <FormField
                            control={form.control}
                            name="Name"
                            render={({ field }) => (
                                <FormItem ref={parent}>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="!pl-6 !rounded-full !bg-[#DEEEF7] placeholder:text-gray-400 !outline-none !ring-0 !border-[#185273]"
                                            placeholder="Full Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Phone Number Field */}
                        <FormField
                            control={form.control}
                            name="PhoneNumber"
                            render={({ field }) => (
                                <FormItem ref={parent}>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="!pl-6 !rounded-full !bg-[#DEEEF7] placeholder:text-gray-400 !outline-none !ring-0 !border-[#185273]"
                                            placeholder="Mobile Number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Batch ComboBox */}
                        <FormField
                            control={form.control}
                            name="Batch"
                            render={({ field }) => (
                                <FormItem ref={parent}>
                                    <FormLabel>Year joined</FormLabel>
                                    <Popover open={BatchOpen} onOpenChange={handleBatchOpen}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-full !pl-6 !rounded-full !bg-[#DEEEF7] !text-black placeholder:text-gray-400 !outline-none !ring-0 !border-[#185273] justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value || "Select Year"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command>
                                                <CommandInput placeholder="Search year..." />
                                                <CommandList>
                                                    <CommandEmpty>Not found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {generateYears(1982, 2024).map((batch) => (
                                                            <CommandItem
                                                                key={batch}
                                                                className="cursor-pointer "
                                                                onSelect={() => {
                                                                    form.setValue("Batch", batch);
                                                                    handleBatchOpen();
                                                                }}
                                                            >
                                                                {batch}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        batch === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Department ComboBox */}
                        <FormField
                            control={form.control}
                            name="Department"
                            render={({ field }) => (
                                <FormItem ref={parent}>
                                    <FormLabel>Department</FormLabel>
                                    <Popover
                                        open={departmentOpen}
                                        onOpenChange={handleDepartmentOpen}
                                    >
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-full !pl-6 !rounded-full !bg-[#DEEEF7] !text-black placeholder:text-gray-400 !outline-none !ring-0 !border-[#185273] justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value || "Select Department"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full  p-0">
                                            <Command>
                                                <CommandInput placeholder="Search department..." />
                                                <CommandList>
                                                    <CommandEmpty>No department found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {department.map((department) => (
                                                            <CommandItem
                                                                className="cursor-pointer max-w-[340px] overflow-ellipsis"
                                                                key={department.value}
                                                                onSelect={() => {
                                                                    form.setValue("Department", department.value);
                                                                    handleDepartmentOpen();
                                                                }}
                                                            >
                                                                {department.value}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        department.value === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="mx-auto mt-8 flex items-center justify-center">
                            <Button
                                type="submit"
                                className="uppercase !text-white !bg-[#0078B6] !text-center !mx-auto !w-full !max-w-[340px] !py-4 !rounded-full !font-semibold !cursor-pointer disabled:!bg-[#0078B6]/70 !h-[40px] transition-all ease-in-out hover:bg-[#0078B6]/70 hover:shadow-lg"
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Register Now"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

            <Dialog open={open} onOpenChange={handleDialog}>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex items-center justify-center flex-col">
                                <img src={SuccesImg} className="mx-auto" />
                                <h1 className="text-center text-2xl font-semibold text-black ">
                                    Congratulations
                                </h1>
                            </div>
                        </DialogTitle>
                        <DialogDescription>
                            Youre successfully Registred for Global Alumni Meet 2025
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 items-center justify-center my-8 w-full">
                        <button
                            onClick={() => handleJoinWhatsapp()}
                            className="uppercase text-white bg-[#0078B6] text-center w-full max-w-[260px] py-2 rounded-full font-semibold cursor-pointer transition-all ease-in-out hover:bg-[#0078B6]/70 hover:shadow-lg"
                        >
                            join whatsapp
                        </button>
                        <button
                            onClick={() => handleNaviagtion("/generateposter")}
                            className="uppercase text-white bg-[#0078B6] text-center w-full max-w-[260px] py-2 rounded-full font-semibold cursor-pointer transition-all ease-in-out hover:bg-[#0078B6]/70 hover:shadow-lg"
                        >
                            Generate Poster
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Registration;
