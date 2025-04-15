import SignUpForm from "./SignUpForm";
import WhyJoin from "../sections/WhyJoin";
import NavbarLogo from "../navbar/NavBarLogo";

const ProSignUpForm = () => {
  return (
    <>
      <NavbarLogo />
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-4 py-10 gap-10">
        {/* Left: Why Join */}
        <div className="md:w-1/2">
          <WhyJoin />
        </div>

        {/* Right: Signup Form */}
        <div>
          <SignUpForm />
        </div>
      </div>
    </>
  );
};

export default ProSignUpForm;
