import { CloudArrowUpIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import Label from "./component/label";

function App() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const maxLength = 100;

  let country = [
    { label: "Bangladesh", value: "Bangladesh" },
    { label: "India", value: "India" },
    { label: "China", value: "China" },
    { label: "Finland", value: "Finland" },
  ];

  const product = [
    { label: "Universal Business Cloud Accounting", value: 1 },
    { label: "Universal Business Cloud CRM", value: 2 },
    { label: "Universal Business Cloud ERP", value: 3 },
    { label: "Universal Business Cloud HR", value: 4 },
    { label: "Universal Business Cloud Payroll", value: 5 },
    { label: "Universal Business Cloud Project Management", value: 6 },
  ];

  // const handleChange = (event) => {
  //   const inputText = event.target.value;
  //   if (inputText.length <= maxLength) {
  //     setText(inputText);
  //   }
  // };

  const [previewImage, setPreviewImage] = useState(null);

  const questionValue = watch("question") || "";
  const aboutValue = watch("about") || "";

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    // Call your API or handle form submission here
  };

  return (
    <div className="container mx-auto mt-10 pb-1 px-12 w-1/3 bg-white">
      <h1 className="text-xl font-bold mb-5 border-b border-b-gray-900/10 border-l-indigo-500/100 border-l-4 p-3">
        Contact us
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="col-span-full">
            <Label title="Contact category" />
            <div className="mt-2">
              <Controller
                name="country"
                control={control}
                render={({ field: { onChange, _, value } }) => (
                  <ReactSelect
                    placeholder="Inquiry about operation"
                    options={country}
                    value={country.find((c) => c.value === value)}
                    onChange={(value) => onChange(value)}
                    isClearable
                  />
                )}
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-500">
                  This field is required
                </p>
              )}
            </div>
          </div>
          <div className="col-span-full">
            <Label title="Target product" isRequired />
            <div className="mt-2">
              <Controller
                name="product"
                control={control}
                render={({ field: { onChange, _, value } }) => (
                  <ReactSelect
                    placeholder="Select product"
                    options={product}
                    value={product.find((c) => c.value === value)}
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

            <div className="mt-2">
              <textarea
                id="about"
                name="about"
                rows={3}
                maxLength={maxLength}
                className={`w-full rounded-md  p-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400   `}
                placeholder="Example - Tried to register information on the form screen"
                // onChange={handleChange}
                {...register("about", { required: true })}
              />
              <p className="text-gray-500 text-right">
                {aboutValue.length}/{maxLength}
              </p>
              {errors.about && (
                <p className="mt-1 text-sm text-red-500">
                  This field is required
                </p>
              )}
            </div>
          </div>
          <div className="col-span-full">
            <Label title=" Here is the question text" isRequired />

            <div className="mt-2">
              <textarea
                id="question"
                name="question"
                rows={2}
                maxLength={maxLength}
                className={`w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400  `}
                placeholder="placeholder"
                {...register("question", { required: true })}
              />
              <p className="text-gray-500 text-right">
                {questionValue.length}/{maxLength}
              </p>
              {errors.question && (
                <p className="mt-1 text-sm text-red-500">
                  This field is required
                </p>
              )}
            </div>
          </div>
          <div className="col-span-full">
            <Label title="Action screenshots" />

            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-indigo-600 px-6 py-10">
              <div className="text-center">
                <CloudArrowUpIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className=" flex text-sm leading-6 text-gray-600 ">
                  <label
                    htmlFor="file-upload"
                    className="relative  cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      {...register("fileUpload")}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  Max 10 MB files are allowed
                </p>
              </div>
            </div>
            <p className="text-gray-400">
              Only support .jpg, .png and .svg and zip files
            </p>
          </div>

          {previewImage && (
            <div className="mt-2">
              <img
                src={previewImage}
                alt="Preview"
                className="max-w-full h-auto"
              />
            </div>
          )}

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

        <div className="m-6 flex items-center justify-center gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
