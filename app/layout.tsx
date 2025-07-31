// app/layout.tsx
export const metadata = {
  title: 'Catch CS Chatbot',
  description: '캐치테이블 고객센터 챗봇',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
