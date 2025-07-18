import { Routes, Route } from "react-router-dom";
import HomeAccount from "../../pages/client/account/HomeAccount";
import AccountSetting from "../../pages/client/account/AccountSetting";
import RentedMovie from "../../pages/client/account/RentedMovie";
import ManagePlans from "../../pages/client/account/ManagePlan";

function AccountRouter() {
  return (
    <Routes>
      <Route path="/setting/*" element={<HomeAccount />}>
        <Route path="account" element={<AccountSetting />} />
        <Route path="rentedMovie" element={<RentedMovie />} />
        <Route path="managePlans" element={<ManagePlans />} />
      </Route>
    </Routes>
  );
}
export default AccountRouter;
