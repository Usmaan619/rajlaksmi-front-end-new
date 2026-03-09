import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

const HeaderProfile = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <ProfileDropdown />
  ) : (
    <Link to="/login" className="hidden sm:block">
      <Button className="bg-primary hover:bg-forest-light text-primary-foreground gap-2 rounded-full shadow-sm hover:shadow-md transition-all px-5">
        <User size={18} />
        <span className="font-semibold">Login</span>
      </Button>
    </Link>
  );
};

export default HeaderProfile;
