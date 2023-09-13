import {
  forwardRef,
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
} from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { GiHamburgerMenu } from "react-icons/gi";

import navLinks from "@/lib/links/navLinks";

import styles from "./Links.module.css";

type AnchorPropType = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

interface MobileItemProps extends AnchorPropType {
  text: string;
}

type AnchorRef = React.LegacyRef<HTMLAnchorElement> | undefined;

function MobileItem(
  { text, ...props }: MobileItemProps,
  forwardedRef: AnchorRef,
) {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <a
          target="_blank"
          rel="nooopener"
          className={`block p-3 text-center font-bold bg-purple-hover focus:border-2 focus:border-purple-400`}
          {...props}
          ref={forwardedRef}
        >
          {text}
        </a>
      </NavigationMenu.Link>
    </li>
  );
}

const MobileLink = forwardRef(MobileItem);

function DesktopLink({ href, text }: { href: string; text: string }) {
  const anchorStyle =
    text === "Sign Up"
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
        {text}
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}

export default function Links() {
  return (
    <NavigationMenu.Root className="relative z-[1]">
      <NavigationMenu.List className="mx-3 flex gap-3 rounded-lg">
        {navLinks.map((link) => (
          <DesktopLink href={link.link} text={link.name} key={link.link} />
        ))}

        <NavigationMenu.Item className="sm:hidden">
          <NavigationMenu.Trigger
            className={`block rounded-lg p-3 font-bold duration-300 bg-purple-hover data-[state=open]:bg-purple-600/30 dark:data-[state=open]:bg-purple-300/30 sm:hidden`}
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
            className={`${styles.NavigationMenuContent} bg-card`}
          >
            <ul className="whitespace-nowrap py-3">
              {navLinks.map((link) => (
                <MobileLink href={link.link} text={link.name} key={link.link} />
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <div className="absolute left-0 top-[120%] -translate-x-5">
        <NavigationMenu.Viewport
          className={`${styles.NavigationMenuViewport} overflow-hidden rounded-lg shadow-lg`}
        />
      </div>
    </NavigationMenu.Root>
  );
}
