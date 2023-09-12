import {
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
  forwardRef,
} from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { GiHamburgerMenu } from "react-icons/gi";

import navLinks from "@/lib/links/navLinks";

import styles from "./Links.module.css";

interface MobileLinkProps {
  title: string;
}

type AnchorRef = React.LegacyRef<HTMLAnchorElement> | undefined;

const MobileLink = forwardRef(function Item(
  {
    title,
    ...props
  }: MobileLinkProps &
    DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
  forwardedRef: AnchorRef,
) {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <a
          target="_blank"
          rel="nooopener"
          className={`bg-purple-hover block p-3 text-center font-bold focus:border-2 focus:border-purple-400`}
          {...props}
          ref={forwardedRef}
        >
          {title}
        </a>
      </NavigationMenu.Link>
    </li>
  );
});

const DesktopLink = ({ href, title }: { href: string; title: string }) => {
  const anchorStyle =
    title === "Sign Up"
      ? "bg-purple-300 text-slate-800 hover:opacity-80"
      : "bg-purple-hover";

  return (
    <NavigationMenu.Item className="hidden sm:block">
      <NavigationMenu.Link
        target="_blank"
        rel="nooopener"
        className={`${anchorStyle} rounded-lg p-3 font-bold duration-300`}
        href={href}
      >
        {title}
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
};

const Links = () => {
  return (
    <NavigationMenu.Root className="relative z-[1]">
      <NavigationMenu.List className="mx-3 flex gap-3 rounded-lg">
        {navLinks.map((link) => (
          <DesktopLink href={link.link} title={link.name} key={link.link} />
        ))}

        <NavigationMenu.Item className="sm:hidden">
          <NavigationMenu.Trigger
            className={`bg-purple-hover block rounded-lg p-3 font-bold duration-300 data-[state=open]:bg-purple-600/30 dark:data-[state=open]:bg-purple-300/30 sm:hidden`}
            aria-label="Toggle navigation menu"
            onPointerMove={(event) => event.preventDefault()}
            onPointerLeave={(event) => event.preventDefault()}
          >
            <GiHamburgerMenu
              className={`${styles.BurgerMenu} text-xl duration-300`}
              aria-hidden
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            disableOutsidePointerEvents
            onPointerEnter={(event) => event.preventDefault()}
            onPointerLeave={(event) => event.preventDefault()}
            className={`${styles.NavigationMenuContent} bg-slate-200 dark:bg-slate-800`}
          >
            <ul className="whitespace-nowrap py-3">
              {navLinks.map((link) => (
                <MobileLink
                  href={link.link}
                  title={link.name}
                  key={link.link}
                />
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator
          className={`${styles.NavigationMenuIndicator} top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden`}
        >
          <div className="bg-card top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px]" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="absolute left-0 top-[120%] -translate-x-5">
        <NavigationMenu.Viewport
          className={`${styles.NavigationMenuViewport} overflow-hidden rounded-lg shadow-lg`}
        />
      </div>
    </NavigationMenu.Root>
  );
};

export default Links;
