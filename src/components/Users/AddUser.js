import classes from "./AddUser.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import { useState, useRef } from "react";

function AddUser(props) {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (e) => {
    e.preventDefault();

    const username = nameInputRef.current.value;
    const age = ageInputRef.current.value;

    if (username.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }

    if (+age < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }

    const enteredData = {
      username: username,
      age: age,
      id: Math.random().toString(),
    };

    props.onAddUser(enteredData);

    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />

          <label htmlFor="age">Age(Years)</label>
          <input id="age" type="number" ref={ageInputRef} />

          <Button text="Add User" type="submit" />
        </form>
      </Card>
    </Wrapper>

    //We can also use react fragments
    // <>
    //   {error && (
    //     <ErrorModal
    //       title={error.title}
    //       message={error.message}
    //       onConfirm={errorHandler}
    //     />
    //   )}
    //   <Card className={classes.input}>
    //     <form onSubmit={addUserHandler}>
    //       <label htmlFor="username">Username</label>
    //       <input
    //         value={username}
    //         onChange={usernameChangeHandler}
    //         id="username"
    //         type="text"
    //       />

    //       <label htmlFor="age">Age(Years)</label>
    //       <input
    //         value={age}
    //         onChange={ageChangeHandler}
    //         id="age"
    //         type="number"
    //       />

    //       <Button text="Add User" type="submit" />
    //     </form>
    //   </Card>
    // </>
  );
}

export default AddUser;
