import React, { useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import Footer from "../components/Layout/Footer";

const FAQ = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <Faq />
      <Footer />
    </div>
  );
};
const Faq = () => {
  const [activeTab, setActiveTab] = useState(0);
  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };
  return (
    <div className={`${styles.section} my-8 text-white`}>
      <h2 className="text-3xl font-bold mb-8">FAQ</h2>
      <div className="mx-auto space-y-4 ">
        {/* single faq */}
        <div className="border-b border-gray-200 pb-4 ">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(1)}
          >
            <span className="text-lg font-medium ">
              How do I track my order?
            </span>
            {activeTab === 1 ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 1 && (
            <div className="mt-4">
              <p className="text-base ">
                We typiclly process and ship orders within 1-2 business days.
                Depending on your location, it can take an additional 2-7 days
                for your order to arrive.
              </p>
            </div>
          )}
        </div>{" "}
        <div className="border-b border-gray-200 pb-4 ">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(2)}
          >
            <span className="text-lg font-medium">
              How do I track my order?
            </span>
            {activeTab === 2 ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 2 && (
            <div className="mt-4">
              <p className="text-base ">
                We typiclly process and ship orders within 1-2 business days.
                Depending on your location, it can take an additional 2-7 days
                for your order to arrive.
              </p>
            </div>
          )}
        </div>{" "}
        <div className="border-b border-gray-200 pb-4 ">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(3)}
          >
            <span className="text-lg font-medium">
              How do I track my order?
            </span>
            {activeTab === 3 ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 3 && (
            <div className="mt-4">
              <p className="text-base ">
                We typiclly process and ship orders within 1-2 business days.
                Depending on your location, it can take an additional 2-7 days
                for your order to arrive.
              </p>
            </div>
          )}
        </div>{" "}
        <div className="border-b border-gray-200 pb-4 ">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(4)}
          >
            <span className="text-lg font-medium">
              How do I track my order?
            </span>
            {activeTab === 4 ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 4 && (
            <div className="mt-4">
              <p className="text-base ">
                We typiclly process and ship orders within 1-2 business days.
                Depending on your location, it can take an additional 2-7 days
                for your order to arrive.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default FAQ;
