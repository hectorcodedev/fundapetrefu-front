import React from "react";
import {
  AboutUs,
  Adopt,
  Support,
  Home,
  News,
  Pet,
  AdoptForm,
  AdoptSurvey,
  Contact,
} from "./containers";
import {
  NewsModule,
  CandidatesModule,
  SurveysModule,
  Login,
  ResetPassword,
  UsersModule,
  PetsModule,
  PetImagesModule,
  AdoptedReport,
  FeaturedReport,
  ShelterInfoModule,
  SupportModule,
  AdoptersModule,
  SupportersModule
} from "./admin";
import { ColorPalette } from "./components";
import "./App.css";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./admin/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/nosotros" element={<AboutUs />} />
        <Route path="/adopta" element={<Adopt />} />
        <Route path="/adopta/formulario" element={<AdoptForm />} />
        <Route path="/adopta/encuesta" element={<AdoptSurvey />} />
        <Route path="/mascota/:id" element={<Pet />} />
        <Route path="/ayuda" element={<Support />} />
        <Route path="/" element={<Home />} />
        <Route path="/noticias" element={<News />} />
        <Route path="/colors" element={<ColorPalette />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/contacto" element={<Contact />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/modulo/usuarios" element={<UsersModule />} />
          <Route path="/modulo/adoptantes" element={<AdoptersModule />} />
          <Route path="/modulo/mascotas" element={<PetsModule />} />
          <Route
            path="/modulo/mascotas/imagenes"
            element={<PetImagesModule />}
          />
          <Route path="/modulo/noticias" element={<NewsModule />} />
          <Route path="/modulo/candidatos" element={<CandidatesModule />} />
          <Route path="/modulo/encuestas" element={<SurveysModule />} />
          <Route path="/modulo/ayuda" element={<SupportModule />} />
          <Route path="/modulo/nosotros" element={<ShelterInfoModule />} />
          <Route path="/modulo/colaboradores" element={<SupportersModule />} />
          <Route
            path="/modulo/reportes/adoptados"
            element={<AdoptedReport />}
          />
          <Route
            path="/modulo/reportes/destacados"
            element={<FeaturedReport />}
          />
        </Route>
        <Route path="/test" element={<ColorPalette />} />
      </Routes>
    </>
  );
}

export default App;
