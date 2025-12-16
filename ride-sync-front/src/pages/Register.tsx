
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12">
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
};

export default Register;
