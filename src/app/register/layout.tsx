import WebinarExitSurvey from "@/components/WebinarExitSurvey";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <WebinarExitSurvey />
    </>
  );
}
