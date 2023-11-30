import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ProfilePage.module.css";
import { NavLink } from "react-router-dom";
import { ChangeLogin } from "../../lesia/ChangeLogin";
import { ChangePassword } from "../../lesia/ChangePassword";
import { SelectWorkout } from "../../lesia/SelectWorkout";
import { ChangeSucsess } from "../../lesia/ChangeSucsess";
import { UpdateAuth } from "../../lesia/UpdateAuth";
import { Modal } from "../../lesia/Modal";
import { useGetAllCoursesQuery } from "../../../store/coursesApi";
import { useGetUserCoursesQuery } from "../../../store/userCoursApi";

export const ProfilePage = ({ login }) => {
  const [changeData, setChangeData] = useState("");
  const id = localStorage.getItem("id");

  const { data } = useGetAllCoursesQuery();
  const allCourses = [];
  if (data) {
    const keys = Object.keys(data);
    keys.forEach((key) => allCourses.push(data[key]));
  }

  const dataUsers = useGetUserCoursesQuery().data;

  const usersCourses = [];
  if (allCourses && dataUsers && dataUsers[id]) {
    const coursesId = dataUsers[id].courses;

    for (let i = 0; i < allCourses.length; i++) {
      for (let j = 0; j < coursesId.length; j++) {
        if (allCourses[i]._id === coursesId[j]) {
          usersCourses.push(allCourses[i]);
        }
      }
    }
  }

  const handleImg = (item) => {
    switch (item.name) {
      case "Стретчинг":
        return "/img/stratching.png";
      case "Бодифлекс":
        return "/img/bodyflex.png";
      case "Йога":
        return "/img/yoga.png";
      case "Танцевальный фитнес":
        return "/img/dance.png";
      case "Степ-аэробика":
        return "/img/stap.png";
      default:
        return "/img/stap.png";
    }
  };

  const getModalForm = () => {
    switch (changeData) {
      case "login":
        return (<ChangeLogin
          onFormClose={() => setChangeData("")}
          onFormSubmited={() => setChangeData("loginChanged")}
          onFormError={() => setChangeData("errorLogin")}
          />
        );
      case "password":
        return (<ChangePassword
          onFormClose={() => setChangeData("")}
          onFormSubmited={() => setChangeData("passwordChanged")}
          onFormError={() => setChangeData("errorPassword")}
          />
        );
      case "workouts":
        return <SelectWorkout onFormClose={() => setChangeData("")} />;
      case "passwordChanged":
        return <ChangeSucsess
          onFormClose={() => setChangeData("")}
          text={"Пароль успешно изменен"}
        />;
      case "loginChanged":
        return <ChangeSucsess
          onFormClose={() => setChangeData("")}
          text={"Логин успешно изменен"}
        />;
      case "errorLogin":
        return <UpdateAuth
          onFormClose={() => setChangeData("")}
          onFormNewForm={() => setChangeData("login")}
          text={"Для смены логина нужно еще раз залогиниться"}
        />
        case "errorPassword":
          return <UpdateAuth
            onFormClose={() => setChangeData("")}
            onFormNewForm={() => setChangeData("login")}
            text={"Для смены пароля нужно еще раз залогиниться"}
          />
      default:
        return null;
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <NavLink to="/">
          <div>
            <img src="img/logoblack.svg" alt="logo" />
          </div>
        </NavLink>
        <div>
          <NavLink className={styles.user} to="/profile">
            <img src="img/Ellipse.svg" alt="" />
            <p>{login}</p>
          </NavLink>
        </div>
      </div>
      <div className={styles.content_profile}>
        <p className={styles.content_title}>Мой профиль</p>
        <div className={styles.content_user}>
          <p className={styles.content_user_item}>Логин: {login}</p>
        </div>
        <div className={styles.content_buttons}>
          <button
            className={styles.button_edit}
            onClick={() => setChangeData("login")}
          >
            Редактировать логин
          </button>
          <button
            className={styles.button_edit}
            onClick={() => setChangeData("password")}
          >
            Редактировать пароль
          </button>
        </div>
      </div>
      <div className={styles.content_profile}>
        <p className={styles.content_title}>Мои курсы</p>
        <div className={styles.content_main}>
          {usersCourses.map((item, i) => (
            <div className={styles.img_box} key={i}>
              <p className={styles.img_title}>{item.name}</p>
              <img
                className={styles.img}
                src={handleImg(item)}
                alt="fitness_img"
              />
              <div className={styles.button}>
                <div className={styles.box}>
                  <button
                    className={styles.button_courses}
                    onClick={() => setChangeData("workouts")}
                  >
                    Перейти →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {createPortal(
        <Modal isOpen={changeData}>{getModalForm()}</Modal>,
        document.body
      )}
    </div>
  );
};
