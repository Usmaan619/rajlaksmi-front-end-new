import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, User, Package, Heart, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors ml-2 py-1.5 px-2 rounded-full border border-slate-200 bg-white shadow-sm">
          <Avatar className="h-8 w-8 border border-primary/20 shadow-inner">
            <AvatarImage src={user?.profile_image} alt={user?.full_name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold uppercase">
              {getInitials(user?.full_name)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:block text-sm font-bold text-slate-700 pr-1">
            {user?.full_name?.split(" ")[0] || "User"}
          </span>
          <ChevronDown className="h-4 w-4 text-slate-400 hidden md:block mr-1" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 mt-2 rounded-2xl p-0 border-slate-200 overflow-hidden shadow-xl animate-in fade-in zoom-in-95"
      >
        <div className="flex items-center justify-start gap-4 p-5 bg-slate-50 border-b border-slate-100">
          <Avatar className="h-12 w-12 border border-primary/20 shadow-sm">
            <AvatarImage src={user?.profile_image} alt={user?.full_name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-base font-bold uppercase">
              {getInitials(user?.full_name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-bold text-slate-900 truncate">
              {user?.full_name || "User"}
            </p>
            <p className="text-xs text-slate-500 truncate font-medium">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
        <div className="p-3 space-y-1">
          <DropdownMenuItem
            asChild
            className="rounded-xl cursor-pointer flex items-center gap-3 px-3 py-3 hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors focus:bg-slate-50"
          >
            <Link to="/profile">
              <User className="h-5 w-5" />
              <span className="font-semibold">My Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="rounded-xl cursor-pointer flex items-center gap-3 px-3 py-3 hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors focus:bg-slate-50"
          >
            <Link to="/orders">
              <Package className="h-5 w-5" />
              <span className="font-semibold">My Orders</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="rounded-xl cursor-pointer flex items-center gap-3 px-3 py-3 hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors focus:bg-slate-50"
          >
            <Link to="/wishlist">
              <Heart className="h-5 w-5" />
              <span className="font-semibold">Wishlist</span>
            </Link>
          </DropdownMenuItem>
          <div className="h-px bg-slate-100 my-2 mx-3"></div>
          <DropdownMenuItem
            onClick={handleLogout}
            className="rounded-xl cursor-pointer flex items-center gap-3 px-3 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors focus:bg-red-50 focus:text-red-700"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-semibold">Logout</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
