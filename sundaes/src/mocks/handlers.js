import { rest, http, sleep, HttpResponse } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chooclate.png" },
        { name: "Vanilla", imagePath: "images/vanilla.png" },
      ])
    );
  }),
  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Cherries", imagePath: "/images/cherries.png" },
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
        { name: "Hot Fudge", imagePath: "/images/hot-fundge.png" },
      ])
    );
  }),
  rest.post("http://localhost:3030/order", async (req, res, ctx) => {
    //await sleep(100);
    return res(ctx.json({ orderNumber: 12345 }));
  }),
  // http.post("http://localhost:3030/order", async () => {
  //   await delay(1000);
  //   return HttpResponse.json(12345, { status: 201 });
  // }),
];
