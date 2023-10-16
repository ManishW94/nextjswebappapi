"use client";

// import { error } from "console";
import { ChangeEvent, FormEvent, useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    role: "",
    avatar: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send a POST request to the registration endpoint
    const res = await fetch("http://localhost:3000/api/registeruser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok && data.status === 200) {
      // Registration successful
      console.log(data);
      setErrorMsg(true);

      setTimeout(() => {
        setErrorMsg(false);
      }, 3000);
      console.log(data.message);
    } else {
      // Error occurred during registration
      console.error(data.message);
      console.log(data.message);
    }
  };

  return (
    <div>
      {" "}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {errorMsg === true ? (
          <div className="flex rounded-sm ease-in-out bg-green-500 border-l-4 border-green-700 w-80 py-2 px-3 shadow-md mb-2">
            {/* <!-- icons --> */}
            <div className="text-green-500 rounded-full bg-white mr-3">
              <svg
                width="1.8em"
                height="1.8em"
                viewBox="0 0 16 16"
                className="bi bi-check"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                />
              </svg>
            </div>
            {/* <!-- message --> */}
            <div className="text-white max-w-xs mt-0.5 ">
              User got registered Sucessfully!!
            </div>
          </div>
        ) : null}

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            SignUp to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Role
              </label>
              <div className="mt-2">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="select select-md border-gray-200 text-sm h-10 text-gray-600 rounded w-full font-normal"
                >
                  <option disabled selected>
                    Select your role!
                  </option>
                  <option>USER</option>
                  <option>ADMIN</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Avatar
              </label>
              <div className="mt-2">
                <input
                  id="avatar"
                  name="avatar"
                  required
                  value={formData.avatar}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
