import { CloudArrowUpIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import Label from "./component/label";

function App() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const maxLength = 100;

  const category = [
    { label: "Inquiry about operation", value: 1 },
    { label: "Inquiry about product", value: 2 },
    { label: "Inquiry about service", value: 3 },
    { label: "Inquiry about support", value: 4 },
  ];

  const product = [
    { label: "Universal Business Cloud Accounting", value: 1 },
    { label: "Universal Business Cloud CRM", value: 2 },
    { label: "Universal Business Cloud ERP", value: 3 },
    { label: "Universal Business Cloud HR", value: 4 },
    { label: "Universal Business Cloud Payroll", value: 5 },
    { label: "Universal Business Cloud Project Management", value: 6 },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const questionValue = watch("question") || "";
  const aboutValue = watch("about") || "";
  const fileUpload = watch("fileUpload") || "";

  useEffect(() => {
    const file = fileUpload[0];
    const fileParts = file?.name.split(".");
    // Lấy phần tử cuối cùng của mảng, đó chính là phần mở rộng
    const fileExtension = fileParts?.[fileParts?.length - 1];

    if (fileExtension && !["png", "svg", "jpg"].includes(fileExtension)) {
      setError("fileUpload", {
        type: "custom",
        message: "Only support .jpg, .png and .svg file",
      });
    } else {
      if (file && file.size > 10 * 1024 * 1024) {
        setError("fileUpload", {
          type: "custom",
          message: "Max 10 MB file is allowed",
        });
      }
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [fileUpload, setError]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Thực hiện xử lý dữ liệu hoặc gửi dữ liệu đến API
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Gửi thành công
      setSubmitSuccess(true);
      // Reset form sau khi gửi thành công
      reset();
      reset({ category: null, product: null, fileUpload: null });
    } catch (error) {
      // Xử lý lỗi nếu cần
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto pt-10 pb-1 px-12 bg-white sm:w-full lg:w-1/3">
      <h1 className="text-xl font-bold mb-5 border-b border-b-gray-900/10 border-l-indigo-500/100 border-l-4 p-3">
        Contact us
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div className="col-span-full">
            <Label title="Contact category" />
            <div className="mt-1">
              <Controller
                name="category"
                control={control}
                render={({ field: { onChange, _, value } }) => {
                  return (
                    <ReactSelect
                      placeholder="Select category"
                      options={category}
                      value={value}
                      onChange={(value) => onChange(value)}
                      isClearable
                    />
                  );
                }}
              />
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">
                  This field is required
                </p>
              )}
            </div>
          </div>
          <div className="col-span-full">
            <Label title="Target product" isRequired />
            <div className="mt-1">
              <Controller
                name="product"
                control={control}
                render={({ field: { onChange, _, value } }) => (
                  <ReactSelect
                    placeholder="Select product"
                    options={product}
                    value={value}
                    onChange={(value) => onChange(value)}
                    isClearable
                  />
                )}
                rules={{ required: true }}
              />
              {errors.product && (
                <p className="mt-1 text-sm text-red-500">
                  This field is required
                </p>
              )}
            </div>
          </div>
          <div className="col-span-full">
            <Label title="What kind of operation was he doing?" isRequired />

            <div className="mt-1">
              <div className="relative">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  maxLength={maxLength}
                  className={`w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400`}
                  placeholder="Example - Tried to register information on the form screen"
                  {...register("about", { required: true })}
                />
                <p className="absolute bottom-2 right-2 text-gray-500 text-xs">
                  {aboutValue.length}/{maxLength}
                </p>
              </div>
              {errors.about && (
                <p className="mt-1 text-sm text-red-500">
                  This field is required
                </p>
              )}
            </div>
          </div>
          <div className="col-span-full">
            <Label title=" Here is the question text" isRequired />

            <div className="mt-1">
              <div className="relative">
                <textarea
                  id="question"
                  name="question"
                  rows={2}
                  maxLength={maxLength}
                  className={`w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400  `}
                  placeholder="Enter your question here..."
                  {...register("question", { required: true })}
                />
                <p className="absolute bottom-2 right-2 text-gray-500 text-xs">
                  {questionValue.length}/{maxLength}
                </p>
              </div>

              {errors.question && (
                <p className="mt-1 text-sm text-red-500">
                  This field is required
                </p>
              )}
            </div>
          </div>
          <div className="col-span-full">
            <Label title="Action screenshots" isRequired />
            <div className="flex w-full mt-1 justify-center rounded-lg border border-dashed border-indigo-600 py-4">
              <div className="text-center">
                <CloudArrowUpIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className=" flex text-sm leading-6 text-gray-600 ">
                  <label
                    htmlFor="fileUpload"
                    className="relative  cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="fileUpload"
                      name="fileUpload"
                      type="file"
                      className="sr-only"
                      accept=".jpg, .png, .svg"
                      {...register("fileUpload", { required: true })}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  Max 10 MB file is allowed
                </p>
                <p className="text-xs leading-5 text-gray-600">
                  Only support .jpg, .png and .svg file
                </p>
              </div>
            </div>

            <div
              className={`flex ${
                fullscreen ? "fullscreen" : ""
              } justify-center mt-2 `}
              onClick={toggleFullscreen}
            >
              {fileUpload && previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ maxHeight: "200px" }}
                  className="max-w-full h-auto cursor-pointer border border-indigo-500 rounded-md"
                />
              )}
            </div>
            {!!errors.fileUpload && (
              <p className="mt-1 text-sm text-red-500">
                {errors.fileUpload.message || "This field is required"}
              </p>
            )}
          </div>

          <div className="flex gap-2  items-center">
            <input
              id="candidates"
              name="candidates"
              type="checkbox"
              className="h-5 w-5 rounded"
              {...register("policy", { required: true })}
            />

            <Label title="Agree to the Privacy Policy" />

            {errors.policy && (
              <p className="mt-1 text-sm text-red-500">
                This field is required
              </p>
            )}
          </div>
        </div>

        {/* Thông báo gửi thành công */}
        {submitSuccess && (
          <div
            className="mt-1 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline">
              {" "}
              The form has been submitted successfully.
            </span>
          </div>
        )}

        {/* Nút gửi form */}
        <div className="m-6 flex items-center justify-center gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
