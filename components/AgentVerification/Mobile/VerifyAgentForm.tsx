"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/components/Forms/InputField";
import ErrorMessageBox from "@/components/Forms/ErrorMessageBox";
import apiClient from "@/api/apiClient";
import { baseUrl } from "@/api";
import { AgentStatus, AgentData } from "./types";

const Schema = Yup.object({
  agentId: Yup.string()
    .required("Enter the agent ID")
    .min(4, "Agent ID must be at least 4 characters")
    .max(12, "Agent ID must be at most 12 characters"),
});

export default function VerifyAgentForm({
  setStatus,
  setData,
}: {
  setStatus: (s: AgentStatus) => void;
  setData: (d: AgentData) => void;
}) {
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const res = await apiClient.post(
        `${baseUrl}/agent-verification/verifying`,
        values
      );

      const data = res.data.data;
      setData(data);

      if (data.workingStatus === "working") {
        setStatus({
          working: true,
          notWorking: false,
          notAvailable: false,
          reportAgent: false,
        });
      } else {
        setStatus({
          working: false,
          notWorking: true,
          notAvailable: false,
          reportAgent: false,
        });
      }
    } catch {
      setStatus({
        working: false,
        notWorking: false,
        notAvailable: true,
        reportAgent: false,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 pt-4 pb-28 mt-5 font-poppins">
      {/* Info Card */}
      <div className="rounded-2xl border border-[#DEDEDE] px-5 py-6  -mb-4 text-center">
        <h2 className="text-[20px] font-semibold text-gray-900">
          Find out credibility of Agents
        </h2>

        <p className="mt-3 text-[13px] leading-[18px] line-h text-gray-500">
          Enter an Agent ID to confirm if they’re officially affiliated with
          PropertySeller. Stay protected, informed, and confident in your
          property journey.
        </p>
      </div>

      {/* Form */}
      <Formik
        initialValues={{ agentId: "" }}
        validationSchema={Schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-6 space-y-2">
            <label
              htmlFor="agentId"
              className="block text-[13px] font-semibold -mb-0.5 text-gray-800"
            >
              Agent ID
            </label>

            <InputField
              id="agentId"
              name="agentId"
              placeholder="Enter the agent ID"
              loading={isSubmitting}
              className="rounded-xl border bg-white px-4 text-[14px] placeholder:text-gray-400"
            />

            <ErrorMessageBox name="agentId" />

            {/* Bottom CTA */}
            <div className="fixed bottom-4 left-4 right-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-xl bg-black font-medium text-white"
              >
                Verify Agent
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
