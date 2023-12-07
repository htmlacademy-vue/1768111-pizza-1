import { shallowMount } from "@vue/test-utils";
import Cart from "../Cart.vue";

describe("Cart", () => {
  it("renders correctly when cart is empty", () => {
    const wrapper = shallowMount(Cart, {
      computed: {
        isEmpty: () => true,
      },
    });
    expect(wrapper.find(".sheet.cart__empty").exists()).toBeTruthy();
  });
});

it("posts orders correctly", async () => {
  const postOrderMock = jest.fn();
  const clearOrderMock = jest.fn();

  const wrapper = shallowMount(Cart, {
    methods: {
      postOrder: postOrderMock,
      clearOrder: clearOrderMock,
    },
  });

  await wrapper.vm.postOrders();

  expect(postOrderMock).toHaveBeenCalled();
  expect(clearOrderMock).toHaveBeenCalled();
});

it("emit 'count' event twice with correct payload", async () => {
  const wrapper = mount(Cart);
  // trigger the emit twice
  await wrapper.find("button").trigger("click");
  await wrapper.find("button").trigger("click");
  // first value in first inner array
  expect(wrapper.emitted().count[0][0]).toBe(1);
  // first value in second inner array
  expect(wrapper.emitted().count[1][0]).toBe(2);
});
