import { useEffect, useState } from "react";
import {
  Camera, Mail, Phone, MapPin, Calendar, KeyRound, ShieldCheck, Bell,
  Trash2, Loader2, LogOut, Pencil
} from "lucide-react";
import PropTypes from "prop-types";
import API from "../api";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function UserProfile({ initialUser }) {
  const [user, setUser] = useState(initialUser || null);
  const [loading, setLoading] = useState(!initialUser);
  const [errMsg, setErrMsg] = useState("");

  const [uploading, setUploading] = useState(false);
  const [profileImage, setProfileImage] = useState(initialUser?.profilePic || "");
  const [showChangePwd, setShowChangePwd] = useState(false);

  // Password states
  const [pwdCurr, setPwdCurr] = useState("");
  const [pwdNew, setPwdNew] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [pwdChanging, setPwdChanging] = useState(false);

  // Edit Phone/Location
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  const [deleting, setDeleting] = useState(false);

  // ---------- Fetch Profile ----------
  useEffect(() => {
    let ignore = false;
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setErrMsg("");

        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) {
          setErrMsg("Not authenticated");
          return;
        }

        const res = await API.get("/auth/getProfile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!ignore) {
          setUser(res.data);
          setProfileImage(res.data?.profilePic || "");
        }
      } catch (err) {
        if (!ignore) {
          setErrMsg(err?.response?.data?.message || "Failed to load profile");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchProfile();
    return () => { ignore = true; };
  }, [initialUser]);

  // ---------- Upload Profile Photo ----------
  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image too large. Max 5MB.");
      return;
    }

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      alert("Not authenticated");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    try {
      setUploading(true);
      const res = await API.post("/auth/upload-photo", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const url = res?.data?.fileUrl || res?.data?.file;
      if (!url) throw new Error("Upload response missing file reference");

      const finalUrl = /^https?:\/\//i.test(url) ? url : `/uploads/${url}`;
      setProfileImage(finalUrl);
      setUser((u) => (u ? { ...u, profilePic: finalUrl } : u));
    } catch (err) {
      console.error("Upload failed", err);
      alert(err?.response?.data?.message || err.message || "Upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  // ---------- Change Password ----------
  const handleChangePassword = async () => {
    if (!pwdCurr || !pwdNew || !pwdConfirm) {
      alert("Please fill all password fields.");
      return;
    }
    if (pwdNew !== pwdConfirm) {
      alert("New password and confirm password do not match.");
      return;
    }

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      alert("Not authenticated");
      return;
    }

    try {
      setPwdChanging(true);
      await API.put(
        "/auth/change-password",
        { currentPassword: pwdCurr, newPassword: pwdNew },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Password changed successfully.");
      setShowChangePwd(false);
      setPwdCurr(""); setPwdNew(""); setPwdConfirm("");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to change password");
    } finally {
      setPwdChanging(false);
    }
  };

  // ---------- Edit Phone/Location ----------
  const handleSaveEdit = async () => {
    if (!editingField) return;

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      alert("Not authenticated");
      return;
    }

    try {
      setSavingEdit(true);
      const res = await API.put(
        "/auth/update-profile",
        { [editingField]: editValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // backend returns { message, user }
      setUser(res.data.user);
      alert(`${editingField} updated successfully.`);
      setEditingField(null);
      setEditValue("");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setSavingEdit(false);
    }
  };

  // ---------- Delete Account ----------
  const handleDeleteAccount = async () => {
    const ok = window.confirm("This will permanently delete your account. Continue?");
    if (!ok) return;

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      alert("Not authenticated");
      return;
    }

    try {
      setDeleting(true);
      await API.delete("/auth/delete-account", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      alert("Account deleted.");
      window.location.href = "/";
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete account");
    } finally {
      setDeleting(false);
    }
  };

  // ---------- Logout ----------
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    }
  };
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="p-6 bg-gray-900 rounded-lg border border-gray-800 flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-gray-300">Loading profile…</span>
        </div>
      </div>
    );
  }

  if (errMsg) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="p-4 bg-red-900/40 border border-red-700 rounded-lg text-red-200">
          {errMsg}
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 overflow-hidden">
        {/* Header (Removed green gradient) */}
        <div className="h-32 bg-gray-800" />

        {/* Profile Section */}
        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="relative -mt-16">
              <img
                src={profileImage || "/default-avatar.png"}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-gray-800 shadow-lg object-cover bg-gray-700"
              />
              <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer">
                {uploading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-gray-800" />
                ) : (
                  <Camera className="w-5 h-5 text-gray-800" />
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
            </div>
            <div className="mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-100">{user.name}</h1>
              <p className="text-gray-400">
                {user.currentPlan || "Free"} Plan Member
              </p>
            </div>
            {/* <button
              className="sm:ml-auto mt-4 sm:mt-0 flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button> */}
          </div>
        </div>

        {/* User Details */}
        <div className="border-t border-gray-800 px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoRow icon={<Mail className="w-5 h-5 text-gray-400" />} label="Email" value={user.email} />

            <InfoRow
              icon={<Phone className="w-5 h-5 text-gray-400" />}
              label="Phone"
              value={
                <span className="flex items-center gap-2">
                  {user.phone || "Not set"}
                  <button onClick={() => { setEditingField("phone"); setEditValue(user.phone || ""); }}>
                    <Pencil className="w-4 h-4 text-gray-400 hover:text-white" />
                  </button>
                </span>
              }
            />

            <InfoRow
              icon={<MapPin className="w-5 h-5 text-gray-400" />}
              label="Location"
              value={
                <span className="flex items-center gap-2">
                  {user.location || "Not set"}
                  <button onClick={() => { setEditingField("location"); setEditValue(user.location || ""); }}>
                    <Pencil className="w-4 h-4 text-gray-400 hover:text-white" />
                  </button>
                </span>
              }
            />

            <InfoRow
              icon={<Calendar className="w-5 h-5 text-gray-400" />}
              label="Joined"
              value={user.joinedDate || (user.createdAt?.split("T")[0] ?? "")}
            />
          </div>
        </div>

        {/* Account Settings */}
        <div className="border-t border-gray-800 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">Account Settings</h2>
          <div className="space-y-4">
            <SettingRow
              icon={<ShieldCheck className="w-5 h-5" />}
              title="Two-Factor Authentication"
              desc="Add an extra layer of security to your account"
            >
              <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg text-sm font-medium" disabled>
                Enable
              </button>
            </SettingRow>

            <SettingRow
              icon={<Bell className="w-5 h-5" />}
              title="Email Notifications"
              desc="Receive updates about your account activity"
            >
              <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg text-sm font-medium" disabled>
                Configure
              </button>
            </SettingRow>

            <SettingRow
              icon={<KeyRound className="w-5 h-5" />}
              title="Change Password"
              desc="Update your password to keep your account secure"
            >
              <button
                onClick={() => setShowChangePwd(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
              >
                Change
              </button>
            </SettingRow>

            <SettingRow
              icon={<Trash2 className="w-5 h-5 text-red-500" />}
              title="Delete Account"
              desc="Permanently remove your account and data"
            >
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </SettingRow>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePwd && (
        <Modal onClose={() => setShowChangePwd(false)} title="Change Password">
          <div className="space-y-3">
            <Input label="Current Password" type="password" value={pwdCurr} onChange={setPwdCurr} />
            <Input label="New Password" type="password" value={pwdNew} onChange={setPwdNew} />
            <Input label="Confirm New Password" type="password" value={pwdConfirm} onChange={setPwdConfirm} />
            <div className="flex justify-end gap-2 pt-2">
              <button className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300" onClick={() => setShowChangePwd(false)}>
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
                onClick={handleChangePassword}
                disabled={pwdChanging}
              >
                {pwdChanging ? "Updating…" : "Update Password"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Phone/Location Modal */}
      {editingField && (
        <Modal onClose={() => setEditingField(null)} title={`Edit ${editingField}`}>
          <div className="space-y-3">
            <Input label={editingField} value={editValue} onChange={setEditValue} />
            <div className="flex justify-end gap-2 pt-2">
              <button className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300" onClick={() => setEditingField(null)}>
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
                onClick={handleSaveEdit}
                disabled={savingEdit}
              >
                {savingEdit ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

UserProfile.propTypes = {
  initialUser: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
    currentPlan: PropTypes.string,
    joinedDate: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.string,
  }),
};

// ---------- Small UI Helpers ----------

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start space-x-3">
      <div>{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="font-medium text-gray-200 break-words">{value}</p>
      </div>
    </div>
  );
}

function SettingRow({ icon, title, desc, children }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-gray-400">{icon}</div>
        <div>
          <p className="font-medium text-gray-200">{title}</p>
          <p className="text-sm text-gray-400">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-3">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl">
        <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
          <button className="text-gray-400 hover:text-gray-200" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1">{label}</label>
      <input
        type={type}
        className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-gray-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

InfoRow.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

SettingRow.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};
