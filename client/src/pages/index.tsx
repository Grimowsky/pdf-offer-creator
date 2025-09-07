import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Button,
} from "@heroui/react";
import React from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

import DefaultLayout from "@/layouts/default";
import { PdfTemplate } from "@/components/pdf/pdf.template";

export type Service = {
  serviceName: string;
  price: string;
};

type AddServiceRowProps = {
  add: (r: Service) => void;
};

type SerivceRowProps = {
  service: Service;
  handleDelete: (r: Service) => void;
};

function ServiceRow(props: SerivceRowProps) {
  const { service, handleDelete } = props;

  return (
    <div className="flex ml-2 gap-8 p-4 items-center">
      <div className="w-3/4">{service.serviceName}</div>
      <div className="w-1/4">{service.price}</div>
      <Button
        className="self-center"
        onClick={() => {
          handleDelete(service);
        }}
      >
        Usun
      </Button>
    </div>
  );
}

function AddServiceRow(props: AddServiceRowProps) {
  const [state, setState] = React.useState<Service>({
    serviceName: "",
    price: "",
  });
  const { add } = props;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex gap-4 p-4">
      <Input
        className="w-3/4"
        label="nazwa uslugi"
        name="serviceName"
        value={state.serviceName}
        onChange={handleChange}
      />
      <Input
        className="w-1/4"
        label="cena netto"
        name="price"
        value={state.price}
        onChange={handleChange}
      />
      <Button
        className="self-center"
        onClick={() => {
          add(state);
          setState({ serviceName: "", price: "" });
        }}
      >
        Dodaj
      </Button>
    </div>
  );
}

export default function IndexPage() {
  const [state, setState] = React.useState<Service[]>([]);

  function handleAddRow(r: Service) {
    setState([...state, r]);
  }

  function handleDeleteRow(r: Service) {
    setState((p) => [
      ...p.filter((p) => {
        return p.serviceName.toLowerCase() !== r.serviceName.toLowerCase();
      }),
    ]);
  }

  return (
    <DefaultLayout>
      <div className="flex h-screen mt-8 mb-8">
        <div className="w-1/2 ml-8 h-full">
          <Card className="w-[640px] flex flex-col h-full">
            <CardHeader>
              <div className="w-full text-center">
                <p className="text-md text-default-500">pdf creator</p>
                <Divider className="mt-4" />
              </div>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              {state.map((s, i) => (
                <ServiceRow
                  key={i}
                  handleDelete={handleDeleteRow}
                  service={s}
                />
              ))}
              {state.length > 0 && <Divider />}
              <AddServiceRow add={handleAddRow} />
              <div className="w-[256px] mt-auto self-center align-bottom mt-12">
                <PDFDownloadLink
                  document={<PdfTemplate data={state} />}
                  fileName="pdfdlaBeatki.pdf"
                >
                  {({ loading }) => (
                    <Button
                      className="w-full"
                      disabled={loading}
                      variant="bordered"
                    >
                      Download
                    </Button>
                  )}
                </PDFDownloadLink>
              </div>
            </CardBody>
            <CardFooter>
              <div className="w-full text-center">
                <Divider className="mb-4" />
                <p className="text-md text-default-500">
                  made with love for CyC
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="w-1/2 mr-8">
          <PDFViewer className="w-full h-full" showToolbar={false}>
            <PdfTemplate data={state} />
          </PDFViewer>
        </div>
      </div>
    </DefaultLayout>
  );
}
