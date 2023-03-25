import { useAppDispatch, useAppSelector } from "@/redux/app/reduxHooks";
import { fetchUser, updateToUser } from "@/redux/features/user/userSlice";
import { UserModel } from "@/types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormData = {
  name: string;
  email: string;
  img: string;
};

interface Props {
  updateUserId: string;
}

const UpdateModal = ({ updateUserId }: Props) => {
  const { users } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [updateInfo, setUpdateInfo] = useState<UserModel | any>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    const userInfo =
      users?.users && users?.users.find((user: UserModel) => user?.id === updateUserId);
    if (userInfo) {
      setUpdateInfo(userInfo);
    }
  }, [updateUserId, users?.users]);

  const onSubmit = handleSubmit((data) => {
    const getUsers: any = localStorage.getItem("crud-users");
    const parsUsers = JSON.parse(getUsers);
    const findUser = parsUsers.data.find((user: UserModel) => user?.id === updateUserId);

    if (parsUsers) {
      let info;
      info = {
        ...findUser,
        img: data?.img || findUser.img,
        name: data?.name || findUser.name,
        email: data?.email || findUser.email,
      };
      dispatch(updateToUser(info));
      dispatch(fetchUser());
      toast.success("updated user", { toastId: "update-user", autoClose: 3000 });
    }
  });

  return (
    <>
      <input type="checkbox" id="update_modal" className="modal-toggle" />
      <label htmlFor="update_modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div>
            <h1 className="text-3xl font-bold mt-10 text-center">Update User</h1>
            <div className="max-w-[500px] p-10 mx-auto">
              <form onSubmit={onSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    defaultValue={updateInfo?.name}
                    placeholder="Full name"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control mt-2">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    {...register("email")}
                    defaultValue={updateInfo?.email}
                    type="text"
                    placeholder="Email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control mt-2">
                  <label className="label">
                    <span className="label-text">Image URL</span>
                  </label>
                  <input
                    {...register("img")}
                    defaultValue={updateInfo?.img}
                    type="string"
                    placeholder="Image URL"
                    className="input input-bordered"
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 btn px-0 btn-primary font-semibold text-base-100 w-full rounded mt-10"
                >
                  <label
                    htmlFor="update_modal"
                    className="w-full flex justify-center items-center h-full"
                  >
                    Update User
                  </label>
                </button>
              </form>
            </div>
          </div>
        </label>
      </label>
    </>
  );
};

export default UpdateModal;
