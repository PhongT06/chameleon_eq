import React from 'react';

class ErrorBoundary extends React.Component {
   constructor(props) {
      super(props);
      this.state = { hasError: false, error: null, errorInfo: null };
   }

   static getDerivedStateFromError(error) {
      return { hasError: true };
   }

   componentDidCatch(error, errorInfo) {
      this.setState({ error, errorInfo });
      console.log('Error caught by boundary:', error, errorInfo);
   }

   render() {
      if (this.state.hasError) {
         return (
         <div>
            <h1>Something went wrong. Please try again later.</h1>
            <details style={{ whiteSpace: 'pre-wrap' }}>
               {this.state.error && this.state.error.toString()}
               <br />
               {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
         </div>
      );
      }

      return this.props.children;
   }
}

export default ErrorBoundary;