// import { useEffect, useState } from "react";
import CountUp from "react-countup";
// import axios from "axios";

const Statistics = () => {
//   const [stats, setStats] = useState({ totalUsers: 0, normalUsers: 0, premiumUsers: 0 });

//   useEffect(() => {
//     const fetchStats = async () => {
//       const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/statistics`);
//       setStats(data);
//     };
//     fetchStats();
//   }, []);

  return (
      <div className="my-5">
          <h1 className="text-center font-bold text-3xl mb-5">User Statistics</h1>
    <div className="flex justify-center flex-wrap gap-6 text-center">
      <div className="p-6 bg-white w-72 drop-shadow rounded">
        <h3 className="text-lg font-semibold">Total Users</h3>
        <p className="text-3xl font-bold text-lime-600">
          <CountUp /*end={stats.totalUsers}*/ end={20} duration={10} />
        </p>
      </div>
      <div className="p-6 bg-white w-72 drop-shadow rounded">
        <h3 className="text-lg font-semibold">Normal Users</h3>
        <p className="text-3xl font-bold text-blue-500">
          <CountUp /*end={stats.normalUsers}*/ end={15} duration={10} />
        </p>
      </div>
      <div className="p-6 bg-white w-72 drop-shadow rounded">
        <h3 className="text-lg font-semibold">Premium Users</h3>
        <p className="text-3xl font-bold text-yellow-500">
          <CountUp /*end={stats.premiumUsers}*/ end={5} duration={10} />
        </p>
      </div>
    </div>
    </div>
  );
};

export default Statistics;
