import React, { useState } from "react";

type FormProps = {};

const Form: React.FC<FormProps> = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDetails((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(details);
  };

  return (
    <div className="mt-5">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col border border-blue-300 w-full">
          <input
            name="name"
            className="bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 p-2"
            type="text"
            placeholder="enter your name"
            required
            onChange={onChange}
            value={details.name}
          />
          <input
            name="email"
            className="bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 p-2 mt-2"
            type="email"
            placeholder="enter your email address"
            required
            onChange={onChange}
            value={details.email}
          />
          <input
            name="subject"
            className="bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 p-2 mt-2"
            type="text"
            placeholder="enter the subject"
            onChange={onChange}
            value={details.subject}
          />
          <textarea
            name="message"
            rows={5}
            className="bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 p-2 mt-2"
            placeholder="enter your message"
            required
            onChange={onChange}
            value={details.message}
          />
          <button
            className="bg-teal-500 hover:bg-teal-600 focus:outline-none focus:shadow-outline mt-5"
            type="submit"
          >
            submit data
          </button>
        </div>
      </form>
    </div>
  );
};
export default Form;
