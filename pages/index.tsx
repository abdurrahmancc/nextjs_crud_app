import Navbar from "@/components/header/Navbar";
import SEO from "@/components/SEO";
import UpdateModal from "@/components/UpdateModal";
import { useAppDispatch, useAppSelector } from "@/redux/app/reduxHooks";
import { removeUser } from "@/redux/features/user/userSlice";
import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useRouter } from "next/router";

export default function Home() {
  const { users } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [updateUserId, setUpdateUserId] = useState<string>("");
  const { push } = useRouter();

  const handleUserDelete = (id: string) => {
    dispatch(removeUser(id));
  };

  return (
    <>
      <SEO pageTitle="" />
      <header>
        <Navbar />
      </header>
      <main>
        {users?.users?.length >= 1 ? (
          <section className="container mx-auto">
            <h1 className="text-3xl font-bold my-10 text-center">User List</h1>
            <div className="overflow-x-auto shadow max-w-[700px] mx-auto w-full">
              <table className="table w-full border border-base-300 ">
                {/* head */}
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {users?.users &&
                    users?.users.map((user: any) => (
                      <tr key={user?.id}>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img src={user?.img} alt="Avatar" />
                              </div>
                            </div>
                            <div>
                              <div className="">{user?.name}</div>
                            </div>
                          </div>
                        </td>
                        <td>{user?.email}</td>
                        <td>
                          <label htmlFor="update_modal">
                            <MdEdit
                              onClick={() => setUpdateUserId(user?.id)}
                              className="cursor-pointer text-xl text-warning"
                            />
                          </label>
                        </td>
                        <th>
                          <MdDelete
                            onClick={() => handleUserDelete(user?.id)}
                            className="cursor-pointer text-2xl text-error"
                          />
                        </th>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <div className="text-center h-[calc(100vh-64px)] flex items-center ">
            <button
              onClick={() => push("/add-user")}
              className="btn btn-primary mx-auto w-[200px] h-[56px] font-bold my-10 text-center"
            >
              Add User <HiOutlineArrowRight className="text-xl ml-3" />
            </button>
          </div>
        )}

        <UpdateModal updateUserId={updateUserId} />
      </main>
    </>
  );
}
