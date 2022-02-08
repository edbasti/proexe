import { useEffect, useState } from "react";
import { fetchUsers, userDeleted } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

export function UserList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading);
  const [data, setData] = useState(entities);
  const [asc, setAsc] = useState(true);

  useEffect(() => { setData(entities) }, [entities]);
  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));
  };

  const toggleOrder = () => {
    const sorted = [...data]?.sort((a, b) => {
      if (asc) { return a.name.localeCompare(b.name); } else { return b.name.localeCompare(a.name);}        
    });
    
    setData(sorted);
    setAsc(!asc);
  }

  return (
    <div className="container">
      <div className="row">
        <h1>Redux CRUD User app</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <button
            onClick={() => {
              setData([]);
              dispatch(fetchUsers());
            }}
            className="button-primary"
          >
            Load users
          </button>
        </div>
        <div className="three columns">
          <Link to="/add-user">
            <button className="button-primary">Add user</button>
          </Link>
        </div>
        <div className="three columns">
          <button
            onClick={toggleOrder}
            className="button-primary"
          >
          {
            asc ? 'SORT DESCENDING' : 'SORT ASCENDING'
          }
          </button>
        </div>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                  <th>Email</th>
                  <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length &&
                data.map(({ id, name, email, city }, i) => (
                  <tr key={i}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{city}</td>
                    <td>
                      <button onClick={() => handleDelete(id)}>Delete</button>
                      <Link to={`/edit-user/${id}`}>
                        <button>Edit</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
