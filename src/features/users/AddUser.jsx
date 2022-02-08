import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { userAdded } from "./usersSlice";
import { useForm } from "react-hook-form";

export function AddUser() {
  const { register, handleSubmit, isValid, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const usersAmount = useSelector((state) => state.users.entities.length);

  const onSubmit = data => {
    if (isValid) {
      if (data.name && data.email && data.city) {
        dispatch(
          userAdded({
            id: usersAmount + 1,
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
        <h1>Add user</h1>
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
            Add user
          </button>
          </form>
        </div>
      </div>
    </div>
  );
}
