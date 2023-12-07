import { shallowMount } from "@vue/test-utils";
import Index from "../Index.vue";

describe("Index", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(Index, {
      data() {
        return {
          pizzaToOrder: {
            dough: {
              name: "light",
            },
            size: {
              name: "normal",
            },
            sauce: {
              name: "tomato",
            },
            ingredients: {},
            name: "",
            price: 700,
            id: null,
            amount: null,
          },
        };
      },
    });
    expect(wrapper.find(".content__wrapper").exists()).toBeTruthy();
  });
});

it("sets name correctly", () => {
  const wrapper = shallowMount(Index);
  wrapper.vm.setName("Pepperoni");
  expect(wrapper.vm.pizzaToOrder.name).toBe("Pepperoni");
});

it("transfers ingredient correctly", () => {
  const wrapper = shallowMount(Index);
  wrapper.vm.transferIngredient({ cheese: 1 });
  expect(wrapper.vm.pizzaToOrder.ingredients.cheese).toBe(1);
});
