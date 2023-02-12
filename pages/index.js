import dynamic from "next/dynamic";
import { Header } from "../components/Header/Header";
import { App }  from "./Cheapest/MySolution";


// We have to import the chart this way because it creates some errors if not.
// You have to do the same if you want to import a component that uses the Rechart library.
const ChartDataFromFile = dynamic(
  () => import("../components/Chart/ChartDataFromFile"),
  {
    ssr: false,
  }
);
const ChartDataFromAPI = dynamic(
  () => import("../components/Chart/ChartDataFromAPI"),
  {
    ssr: false,
  }
);



// This is the page that will be rendered at the root of your site.
export default function Home() {
  return (
    <main>


      <Header />
        <ChartDataFromFile />
        <ChartDataFromAPI />
        <App />

    </main>
  );
}

