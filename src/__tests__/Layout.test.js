import Layout from "../components/Layout";
import { render, screen } from "@testing-library/react";

const childNodeText = "Hello World";
const childNodeTestId = "child-node";
const ChildNode = () => <span data-testid={childNodeTestId}>{childNodeText}</span>;
const bgImageSrc = "/assets/images/day-background.png";
const bgImageTestId = "background-image";

describe("Layout", () => {
	it("Deve ser capaz de renderizar elementos filhos.", () => {
		render(<Layout><ChildNode /></Layout>);

		expect(screen.getByTestId(childNodeTestId)).toBeInTheDocument();
		expect(screen.getByTestId(childNodeTestId)).toHaveTextContent(childNodeText);
	});

	it("Caso não receba bgImage como prop não deve renderizar o componente img.", () => {
		render(<Layout />);

		expect(screen.queryByTestId(bgImageTestId)).not.toBeInTheDocument();
	});

	it("Caso receba a prop bgImage deve renderizar o componente img.", () => {
		render(<Layout bgImage={bgImageSrc} />);

		expect(screen.getByTestId(bgImageTestId)).toBeInTheDocument();
		expect(screen.getByTestId(bgImageTestId).src).toContain(bgImageSrc);
	});
});