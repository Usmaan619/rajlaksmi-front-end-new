import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Loader2,
  Save,
  Trash2,
  Plus,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  getAddressesAPI,
  saveAddressAPI,
  deleteAddressAPI,
  updateProfileAPI,
  Address,
} from "@/api/user.service";

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: user?.full_name || (user as any)?.name || "",
    email: user?.email || "",
    mobile_number: user?.mobile_number || "",
    profile_image: user?.profile_image || "",
  });

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressForm, setAddressForm] = useState({
    full_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        full_name: user.full_name || (user as any).name || "",
        email: user.email || "",
        mobile_number: user.mobile_number || "",
        profile_image: user.profile_image || "",
      });
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    if (!user?.id) return;
    try {
      const addrRes = await getAddressesAPI(user.id);
      if (addrRes.success) {
        setAddresses(addrRes.addresses);
      }
    } catch (err) {
      console.error("Error fetching addresses", err);
    } finally {
      setFetching(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateProfileAPI(profileData);
      if (res.success) {
        updateUser(res.user || profileData);
        toast.success("Profile updated successfully");
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024) {
        toast.error("Profile image should not exceed 50KB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileData({ ...profileData, profile_image: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    setLoading(true);
    try {
      const res = await saveAddressAPI({
        ...addressForm,
        user_id: user.id,
        is_default: addresses.length === 0,
      });
      if (res.success) {
        toast.success("Address saved successfully");
        setIsDialogOpen(false);
        fetchAddresses();
        setAddressForm({
          full_name: "",
          phone: "",
          address_line1: "",
          address_line2: "",
          city: "",
          state: "",
          pincode: "",
        });
      } else {
        toast.error(res.message || "Failed to save address");
      }
    } catch (err) {
      toast.error("Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id: number) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      const res = await deleteAddressAPI(id);
      if (res.success) {
        toast.success("Address deleted");
        fetchAddresses();
      } else {
        toast.error(res.message || "Delete failed");
      }
    } catch (err) {
      toast.error("Failed to delete address");
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mb-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-8 rounded-2xl shadow-md border border-slate-100">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-primary/10 transition-transform group-hover:scale-105">
              <AvatarImage
                src={profileData.profile_image}
                alt={user?.full_name}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary/5 text-primary text-3xl font-bold">
                {user?.full_name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-2.5 bg-primary text-white rounded-full shadow-lg hover:bg-forest transition-all"
              title="Change Profile Picture"
            >
              <Camera size={18} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>
          <div className="text-center md:text-left space-y-1 flex-1">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {user?.full_name}
            </h1>
            <p className="text-slate-500 font-medium flex items-center justify-center md:justify-start gap-2">
              <Mail className="h-4 w-4" /> {user?.email}
            </p>
            <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3 items-center">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-widest flex items-center gap-1">
                <CheckCircle2 size={12} /> Verified Customer
              </span>
              <span className="text-[10px] text-rose-500 font-medium bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                Profile image should not exceed 50KB
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-md rounded-2xl overflow-hidden">
              <CardHeader className="bg-white border-b border-slate-50 p-6">
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-800">
                  <User className="text-primary h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your basic account details and profile image
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="full_name"
                          value={profileData.full_name}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              full_name: e.target.value,
                            })
                          }
                          className="pl-10 h-11 bg-slate-50 border-slate-200 focus-visible:ring-primary"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="email"
                          disabled
                          value={profileData.email}
                          className="pl-10 h-11 bg-slate-100 border-none cursor-not-allowed opacity-70"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="mobile"
                        value={profileData.mobile_number}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            mobile_number: e.target.value,
                          })
                        }
                        placeholder="Enter 10-digit mobile number"
                        className="pl-10 h-11 bg-slate-50 border-slate-200 focus-visible:ring-primary"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto bg-primary hover:bg-forest  h-auto text-base font-medium shadow-lg shadow-primary/20 transition-all rounded-md"
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-5 w-5" />
                    )}
                    Save Profile Changes
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md rounded-2xl overflow-hidden">
              <CardHeader className="bg-white border-b border-slate-50 p-6 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-800">
                    <MapPin className="text-primary h-5 w-5" />
                    Saved Addresses
                  </CardTitle>
                  <CardDescription>
                    Manage your shipping locations
                  </CardDescription>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-bold gap-1 border-primary/20 text-primary bg-white hover:bg-primary/5"
                    >
                      <Plus size={16} /> Add New
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-slate-800">
                        Add New Address
                      </DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={handleSaveAddress}
                      className="space-y-4 pt-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-2 sm:col-span-1">
                          <Label>Receiver Name</Label>
                          <Input
                            required
                            value={addressForm.full_name}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                full_name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2 col-span-2 sm:col-span-1">
                          <Label>Phone Number</Label>
                          <Input
                            required
                            value={addressForm.phone}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <Label>Address Line 1</Label>
                          <Input
                            required
                            value={addressForm.address_line1}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                address_line1: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <Label>Address Line 2 (Optional)</Label>
                          <Input
                            value={addressForm.address_line2}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                address_line2: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Input
                            required
                            value={addressForm.city}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                city: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>State</Label>
                          <Input
                            required
                            value={addressForm.state}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                state: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <Label>Pincode</Label>
                          <Input
                            required
                            value={addressForm.pincode}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                pincode: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <DialogFooter className="pt-4">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={loading}
                          className="bg-primary hover:bg-forest font-bold"
                        >
                          {loading ? (
                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          ) : (
                            <Save size={16} className="mr-2" />
                          )}
                          Save Address
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.length > 0 ? (
                    addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`p-5 rounded-xl border transition-all relative ${addr.is_default ? "bg-primary/5 border-primary/20 shadow-md" : "bg-slate-50/50 border-slate-200 hover:border-slate-300"}`}
                      >
                        <div className="flex justify-between items-start mb-2 pr-6">
                          <span className="text-sm font-bold text-slate-900">
                            {addr.full_name}
                          </span>
                          {addr.is_default && (
                            <span className="text-[9px] bg-primary text-white px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4">
                          {addr.address_line1},{" "}
                          {addr.address_line2 && addr.address_line2 + ","}{" "}
                          <br />
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-bold">
                            <Phone size={12} className="text-slate-400" />{" "}
                            {addr.phone}
                          </div>
                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 py-12 text-center bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
                      <MapPin className="h-10 w-10 text-slate-200 mx-auto mb-3" />
                      <p className="text-slate-400 text-sm font-medium">
                        No addresses saved yet
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="border-none shadow-md rounded-2xl bg-primary text-white overflow-hidden relative group">
              <CardContent className="p-7 space-y-4 relative z-10">
                <div className="h-14 w-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <ShoppingBag size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">My Orders</h3>
                  <p className="text-primary-foreground/70 text-sm mt-1">
                    Track your orders and view transaction history
                  </p>
                </div>
                <Button
                  variant="secondary"
                  className="w-full font-semibold h-auto rounded-md hover:bg-white shadow-lg transition-all"
                  onClick={() => navigate("/orders")}
                >
                  View Order History
                </Button>
              </CardContent>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-white/5 rounded-full" />
            </Card>

            <Card className="border-none shadow-md rounded-2xl overflow-hidden bg-white">
              <CardHeader className="pb-2">
                <h3 className="text-lg font-bold text-slate-800">
                  Support Center
                </h3>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <p className="text-slate-500 text-sm leading-relaxed">
                  Our team is available 24/7 to assist you with any questions or
                  technical issues.
                </p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full bg-white font-bold h-11 rounded-xl gap-2 border-slate-200"
                    onClick={() => navigate("/contact")}
                  >
                    <Mail size={16} /> Email Support
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full bg-white font-bold h-11 text-slate-600 rounded-xl"
                    onClick={() => navigate("/faq")}
                  >
                    Visit Help Center
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
