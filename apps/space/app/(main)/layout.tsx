import Header from "./components/header/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
