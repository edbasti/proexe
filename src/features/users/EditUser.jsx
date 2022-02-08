import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { userUpdated } from "./usersSlice";
import { useForm } from "react-hook-form";

export function EditUser() {
  const { register, handleSubmit, isValid, setValue, formState: { errors } } = useForm();
  const { pathname } = useLocation();
  const userId = parseInt(pathname.replace("/edit-user/", ""));

  const user = useSelector((state) =>
    state.users.entities.find((user) => user.id === userId)
  );
  console.log(user);
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => { setValue('name', user?.name); setValue('email', user?.email); setValue('city', user?.city); }, [user]);
  

  const onSubmit = (data) => {
    if (isValid) {
      if (data.name && data.email && data.city) {
        dispatch(
          userUpdated({
            id: userId,
            name: data.name,
            email: data.email,
            city: data.city,
          })
        );

        history.push("/");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Edit user</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="nameInput">Name</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="test@mailbox.com"
            id="nameInput"
            {...register("name", { required: true })}
          />
          {errors.name && <span style={{ color: 'red'}}>This field is required</span>}
          <label htmlFor="emailInput">Email</label>
          <input
            className="u-full-width"
            type="email"
            placeholder="test@mailbox.com"
            id="emailInput"
            {...register("email", { required: true })}
          />
          {errors.email && <span style={{ color: 'red' }}>This field is required</span>}
          <label htmlFor="cityInput">City</label>
          <input
            className="u-full-width"
            type="text"
            id="cityInput"
            {...register("city", { required: true })}
          />
          {errors.city && <span style={{ color: 'red'}}>This field is required</span>}
            <button type="submit" className="button-primary">
              Save user
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
