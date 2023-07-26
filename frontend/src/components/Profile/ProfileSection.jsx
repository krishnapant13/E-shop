import React, { useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import { AiOutlineCamera } from "react-icons/ai";

const ProfileSection = () => {

  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
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
                  <label className="block pb-2">Zip Code</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={6} xl={6}>
                  <label className="block pb-2">Address 1</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={addressOne}
                    onChange={(e) => setAddressOne(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={6} xl={6}>
                  <label className="block pb-2">Address 2</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={addressTwo}
                    onChange={(e) => setAddressTwo(e.target.value)}
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
