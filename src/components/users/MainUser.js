import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listUser } from "./../../redux/actions/UserActions";
import Loading from "./../loadingError/Loading";
import Message from "./../loadingError/Error";

const MainUser = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  return (
    <div>
      <div className="flex">
        <p className="me-14">Customer</p>
        <button className="border-2 border-indigo-600 m-2 p-2">Create</button>
      </div>
      <div className="border-2 border-indigo-600 m-2 p-2">
        <div className="flex border-2 border-indigo-600 m-2 p-2 gap-24">
          <p>Search...</p>
          <div className="flex gap-5">
            <select>
              <option value="" key="">
                Show 20
              </option>
            </select>
            <select>
              <option value="" key="">
                Status all
              </option>
            </select>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <div className="flex gap-9">
            {users.map((item, i) => (
              <div key={i} className="border-2 border-indigo-600 m-2 p-2">
                <p>{item.name}</p>
                <p>{item.isAdmin ? "Admin" : "Customer"}</p>
                <a href={`mailto:${item.email}`}>{item.email}</a>
              </div>
            ))}
          </div>
        )}
        <div>Previous 1 2 Next</div>
      </div>
    </div>
  );
};

export default MainUser;
