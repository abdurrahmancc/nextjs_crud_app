import Navbar from "@/components/header/Navbar";
import SEO from "@/components/SEO";
import { useAppDispatch } from "@/redux/app/reduxHooks";
import { addToUser, fetchUser } from "@/redux/features/user/userSlice";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
var uniqid = require("uniqid");

type FormData = {
  name: string;
  email: string;
  img: string;
};

const AddUser = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    try {
      const id = uniqid();
      const info = { ...data, id };
      dispatch(addToUser(info));
      reset();
      dispatch(fetchUser());
      toast.success("added user", { toastId: "add-user", autoClose: 3000 });
    } catch (error: any) {
      console.log(error.message);
    }
  });

  return (
    <>
      <SEO pageTitle="add user" />
      <header>
        <Navbar />
      </header>
      <main>
        <section className="container mx-auto">
          <h1 className="text-3xl font-bold my-10 text-center">Add User</h1>
          <div className="max-w-[500px] shadow-lg rounded-xl border p-10 mx-auto">
            <form onSubmit={onSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="input input-bordered"
                  {...register("name", {
                    required: { value: true, message: "Name is require" },
                    minLength: { value: 3, message: "min length is 3" },
                  })}
                />
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errors.name?.message}
                  </span>
                )}
                {errors.name?.type === "minLength" && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errors.name?.message}
                  </span>
                )}
              </div>
              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered"
                  {...register("email", {
                    required: { value: true, message: "Email is require" },
                    pattern: {
                      value:
                        /^[\w-']+(\.[\w-']+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/,
                      message: "Provide a valid email",
                    },
                  })}
                />
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errors.email?.message}
                  </span>
                )}
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  type="string"
                  placeholder="Image URL"
                  className="input input-bordered"
                  {...register("img", {
                    required: { value: true, message: "Image is require" },
                    pattern: {
                      value: /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i,
                      message: "Provide a valid image url",
                    },
                  })}
                />
                {errors.img?.type === "pattern" && (
                  <span className="label-text-alt text-red-500 text-xs">{errors.img?.message}</span>
                )}
                {errors.img?.type === "required" && (
                  <span className="label-text-alt text-red-500 text-xs">{errors.img?.message}</span>
                )}
              </div>
              <button
                type="submit"
                className="h-12 btn btn-primary font-semibold text-base-100 w-full rounded mt-10"
              >
                Add User
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default AddUser;
