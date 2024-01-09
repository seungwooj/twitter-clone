import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Error,
  Form,
  Input,
  Switcher,
  SwitcherBottom,
  Title,
  Wrapper,
} from "../components/AuthComponents";
import GithubButton from "../components/GithubButton";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  // Refactor using react-hook-form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // x refresh
    e.preventDefault();
    // reset error
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      // sign in the user
      await signInWithEmailAndPassword(auth, email, password);
      // refirect to the home page
      navigate("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      }
      // setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Login to 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "Log in"} />
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
          New to 𝕏?
          <Link to={"/create-account"}> Create an account &rarr;</Link>
        </Switcher>
        <SwitcherBottom>
          Forgot the Password?
          <Link to={"/reset-password"}> Reset Password&rarr;</Link>
        </SwitcherBottom>
        <GithubButton />
      </Form>
    </Wrapper>
  );
}
