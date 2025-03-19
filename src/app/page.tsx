import Banner from "@/component/banner";
import CourseOverview from "@/component/courseOverview";
import HomePageLearnPart from "@/component/homePageLearnPart";
import OurCourses from "@/component/ourCourses";
import OurServices from "@/component/ourSevices";
// import OurStudents from "@/component/ourStudents";

export default function Home() {
  return (
    <div>
      <Banner />
      <HomePageLearnPart />
      <CourseOverview />
      <OurServices />
      <OurCourses />
      {/* <OurStudents /> */}
    </div>
  );
}
