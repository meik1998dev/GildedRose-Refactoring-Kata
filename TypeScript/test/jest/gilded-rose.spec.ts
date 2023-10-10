import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should decrease quality and sellIn", () => {
    const gildedRose = new GildedRose([new Item("Foo", 5, 6)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(5);
  });

  it("should Sulfuras be as it is always", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 4, 5),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(5);
  });

  it("should Sulfuras be as it is always", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", -5, -6),
    ]);

    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-5);
    expect(items[0].quality).toBe(-6);
  });

  it("Once the sell by date has passed, Quality degrades twice as fast", () => {
    const gildedRose = new GildedRose([new Item("Rocket", 0, 3)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(1);
  });

  it("Aged Brie actually increases in Quality the older it gets", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 2, 3)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(4);
  });

  it("The Quality of an item is never negative", () => {
    const gildedRose = new GildedRose([new Item("Rocket", 0, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it("should decrease quality of Item by 2 when past use-by date", () => {
    const gildedRose = new GildedRose([new Item("Rocket", 0, 6)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(4);
  });

  it("should increase Aged Brie quality twofold when past use-by date", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 3)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(5);
  });

  test("should increase Backstage Pass quality by default", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 20, 3),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(19);
    expect(items[0].quality).toBe(4);
  });

  test("should increase Backstage Pass quality by 2 when it there are 10 days or less", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 3),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(8);
    expect(items[0].quality).toBe(5);
  });

  test("should increase Backstage Pass quality by 3 within 5 days", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 2, 3),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(6);
  });
});
