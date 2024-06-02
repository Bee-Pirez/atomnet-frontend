import Link from "next/link";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { User } from "phosphor-react";

const HeaderAuth = ({ onLogout }) => {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 gap-4 px-4 sm:px-16 md:px-32 lg:px-50 flex justify-between items-center py-8 bg-normalViolet text-white">
      <Link href="/home">
        <img
          src="/logo.svg"
          alt="logoAtomTechnology"
          width={160} // ajuste o valor conforme necessário
          height={160}
          className="logoImage"
        />
      </Link>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              backgroundColor: "var(--normalBlue)",
              textTransform: "uppercase",
              color: "black",
              minWidth: "45px",
              minHeight: "45px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              margin: "0px 14px",
            }}
          >
          <User size={24} className="text-white"/></Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dynamic Actions"
          items={[
            {
              key: "myData",
              label: "Meus dados",
            },
            {
              key: "leave",
              label: "Sair",
              action: onLogout,
            },
          ]}
          style={{
            borderRadius: "4px",
            color: "white",
            backgroundColor: "var(--normalBlue)",
            padding: "10px",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
          }}
        >
          {(item) => (
            <DropdownItem
              key={item.key}
              color={item.key === "delete" ? "danger" : "default"}
              className={item.key === "delete" ? "text-danger" : ""}
              style={{
                padding: "10px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onClick={item.action}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </header>
  );
};

export default HeaderAuth;
