import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import SuccessStories from "./SuccessStories";
import Courses from "./Courses";
import Instructors from "./Instructors";
import Contact from "./Contact";
import FAQs from "./FAQs";
import Footer from "./Footer";



function App() {
  const Container = ({ children, className = "" }) => {
    return (
      <div
        className={`w-full flexCenter max-sm:pt-3 px-2 md:px-3 lg:px-8 sm:pt-6 md:py-4 lg:pt-6 ${className}`}
      >
        <div className="w-full mx-auto max-w-7xl  sm:px-6 lg:px-8 flexCenter">
          {children}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* nav */}
      <Container className="fixed top-0 left-0 right-0 z-10 py-0!  h-16 bg-blue-50/95 dark:bg-slate-800/95 shadow-md/10">
        {/* <div className="bbb"> */}
        <Nav />
        {/* </div> */}
      </Container>

      {/* hero */}
      <Container className="bg-blue-50 dark:bg-slate-800 py-32! md:p-44!">
        {/* <div className="bbg"> */}
        <Hero />
        {/* </div> */}
      </Container>

      {/* about */}
      <Container>
        {/* <div className="bbb"> */}
        <About />
        {/* </div> */}
      </Container>

      {/* success stories */}
      <Container>
        {/* <div className="bbg"> */}
        <SuccessStories />
        {/* </div> */}
      </Container>

      {/* courses */}
      <Container>
        {/* <div className="bbb"> */}
        <Courses />
        {/* </div> */}
      </Container>

      {/* instructors */}
      <Container>
        {/* <div className="bbg"> */}
        <Instructors />
        {/* </div> */}
      </Container>

      {/* contact */}
      <Container>
        {/* <div className="bbb"> */}
        <Contact />
        {/* </div> */}
      </Container>

      {/* faqs */}
      <Container>
        {/* <div className="bbg"> */}
        <FAQs />
        {/* </div> */}
      </Container>

      {/* footer */}
      <Container className="bg-blue-50 dark:bg-slate-800 mt-5">
        {/* <div className="bbb"> */}
        <Footer />
        {/* </div> */}
      </Container>
    </>
  );
}

export default App;
