import { useEffect, type FC } from "react";
import { Button, Card } from "@/shared/ui";
import { Layout } from "@/shared/ui";

const Error404: FC = () => {
  const title = "Страница не найдена";

  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <Layout isHolder>
      <Card
        {...{
          title,
          subtitle: "Такой страницы не существует",
        }}
      >
        <Button caption="На главную" href="/" />
      </Card>
    </Layout>
  )
};

export default Error404;
