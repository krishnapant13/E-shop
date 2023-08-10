import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import { AiOutlineCamera } from "react-icons/ai";
import { toast } from "react-toastify";
import { updateUserInformation } from "../../redux/actions/user";
const ProfileSection = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, []);
  console.log(user);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };
  return (
    <div>
      <>
        <div className="flex justify-center w-full">
          <div className="relative">
            <img
              className="h-40 w-40 rounded-full object-cover border-[3px] border-[#3ad132] "
              src={`${backend_url}${user?.avatar}`}
              alt=""
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px] ">
              <AiOutlineCamera size={20} />
            </div>
          </div>
        </div>{" "}
        <br />
        <br />
        <div className="w-full px-5">
          <form onSubmit={handleSubmit} area-required={true}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={6} xl={6}>
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%]`}
                    required
                    placeholder={user?.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={6} xl={6}>
                  <label className="block pb-2">Email</label>
                  <input
                    type="email"
                    className={`${styles.input} !w-[95%]`}
                    required
                    placeholder={user?.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={6} xl={6}>
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={6} xl={6}>
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>
            <input
              type="submit"
              className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-3  cursor-pointer`}
              value={"Update"}
            />
          </form>
        </div>
      </>
    </div>
  );
};

export default ProfileSection;
