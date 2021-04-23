import Footer from "@/components/layout/Footer";
import { shallowMount } from "@vue/test-utils";

let wrapper = null;

beforeEach(() => {
  wrapper = shallowMount(Footer);
});

afterEach(() => {
  wrapper.destroy();
});

describe("Footer", () => {
  test("is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test("should contain company label", () => {
    const html = wrapper.html();
    expect(html).toContain("Created by");
    expect(html).toContain("8byte Agency");
  });

  test("should contain link to company site", () => {
    const link = wrapper.find("a");
    expect(link.exists()).toBeTruthy();
    expect(link.attributes("href")).toBe("https://www.8byte.agency");
  });
});
