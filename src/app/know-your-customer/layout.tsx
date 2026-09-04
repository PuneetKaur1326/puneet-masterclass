import KycExitSurvey from "@/components/KycExitSurvey";

export default function KycLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <KycExitSurvey />
    </>
  );
}
